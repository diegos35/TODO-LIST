import { IsNotEmpty, IsOptional, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
}

export class Task {
  id: number;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  createdAt: Date;
  updatedAt: Date;
}
