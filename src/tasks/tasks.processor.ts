import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './task.schema';
import { Logger } from '@nestjs/common';

@Processor('task-queue')
export class TasksProcessor {
  private readonly logger = new Logger(TasksProcessor.name);

  constructor(@InjectModel('Task') private taskModel: Model<Task>) {}

  @Process('process-task')
  async handleTask(job: Job<{ taskId: string }>) {
    const { taskId } = job.data;

    const task = await this.taskModel.findById(taskId);

    if (!task) {
      this.logger.warn(`Task with ID ${taskId} not found.`);
      return;
    }

    this.logger.log(`Processing task: ${task._id}`);

    // Update status to processing
    await this.taskModel.findByIdAndUpdate(task._id, { status: 'processing' });

    try {
      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate random failure (30% chance)
      if (Math.random() < 0.3) {
        throw new Error('Simulated task failure');
      }

      // Mark task as completed
      await this.taskModel.findByIdAndUpdate(task._id, {
        status: 'completed',
      });

      this.logger.log(`Task completed: ${task._id}`);
    } catch (error) {
      // Increment attempts
      const attempts = (task.attempts || 0) + 1;

      if (attempts < 3) {
        // Retry: Set status back to pending and save attempts
        await this.taskModel.findByIdAndUpdate(task._id, {
          status: 'pending',
          attempts,
        });

        this.logger.warn(
          `Task ${task._id} failed (attempt ${attempts}). Retrying...`,
        );

        // Re-add to queue
        await job.queue.add(
          'process-task',
          { taskId: task._id.toString() },
          { delay: 2000 },
        );
      } else {
        // Mark as failed after 3 attempts
        await this.taskModel.findByIdAndUpdate(task._id, {
          status: 'failed',
          attempts,
          errorMessage: error.message,
        });

        this.logger.error(
          `Task ${task._id} failed after 3 attempts: ${error.message}`,
        );
      }
    }
  }
}
