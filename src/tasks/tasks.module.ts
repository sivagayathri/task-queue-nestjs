import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './task.schema';
import { BullModule } from '@nestjs/bull';
import { TasksProcessor } from './tasks.processor';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
    BullModule.registerQueue({
      name: 'task-queue',
    }),
  ],
  providers: [TasksService, TasksProcessor],
  controllers: [TasksController],
})
export class TasksModule {}
