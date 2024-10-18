import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types'; // Importa PartialType de mapped-types
import { TaskStatus } from '../enums/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task' }) // Documentación para Swagger
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task', required: false }) // Documentación para Swagger
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    enumName: 'TaskStatus',
  })
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following: pending, in-progress, completed',
  })
  status: TaskStatus;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiProperty({ description: 'The title of the task', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The description of the task', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    enumName: 'TaskStatus',
    required: false,
  })
  @IsEnum(TaskStatus, {
    message:
      'Status must be one of the following: pending, in-progress, completed',
  })
  status?: TaskStatus;
}
