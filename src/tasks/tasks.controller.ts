import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async createTask(@Body('type') type: string) {
    return this.tasksService.create(type);
  }

  @Get('status')
  async getStatus() {
    return this.tasksService.getStatusCount();
  }

  @Get(':id')
  async getTask(@Param('id') id: string) {
    return this.tasksService.getById(id);
  }
}
