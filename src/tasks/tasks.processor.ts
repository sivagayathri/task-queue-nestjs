import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';

@Processor('task-queue') //consumer
export class TasksProcessor {
  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  @Process('process-task')
  async handleTask(job: Job<{ taskId: string }>) {
    const task = await this.taskModel.findById(job.data.taskId);

    if (!task) return;

    console.log(`Processing task: ${task._id}`);

    // Simulate async task
    await this.taskModel.findByIdAndUpdate(task._id, { status: 'processing' });

    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay

    await this.taskModel.findByIdAndUpdate(task._id, { status: 'completed' });

    console.log(`Task completed: ${task._id}`);
  }
}
