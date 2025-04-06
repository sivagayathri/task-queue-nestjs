import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(type: string) {
    const task = new this.taskModel({ type });
    await task.save();
    return { message: 'Task created successfully', id: task._id };
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
}
