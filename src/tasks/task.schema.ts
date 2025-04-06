import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = Task & Document;

export enum TaskStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

// Task schema definition
@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  type: string;

  @Prop({ enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @Prop({ default: 0 })
  attempts: number;

  @Prop()
  errorMessage?: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
