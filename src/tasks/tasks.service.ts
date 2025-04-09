import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { CreateTaskDto } from './dto/create-task';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    @InjectQueue('task-queue') private taskQueue: Queue,
  ) {}

  async create(type: string) {
    const task = new this.taskModel({ type });
    await task.save();

    await this.taskQueue.add('process-task', { taskId: task._id });

    return { message: 'Task created and queued', id: task._id };
  }

  async getStatusCount() {
    const result = await this.taskModel.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ]);

    const response = {
      pending: 0,
      processing: 0,
      completed: 0,
      failed: 0,
    };

    result.forEach((item) => {
      response[item._id] = item.count;
    });

    return response;
  }

  async getById(id: string) {
    const task = await this.taskModel.findById(id);
    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  async createSync(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskModel.create({
      ...createTaskDto,
      status: 'pending',
    });

    // Add job to the queue-producer
    await this.taskQueue.add('process-task', {
      taskId: newTask._id,
    });

    return newTask;
  }
}
