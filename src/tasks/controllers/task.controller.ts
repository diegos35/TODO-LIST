import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { TaskStatus } from '../enums/task-status.enum';

@Controller('tasks')
export class TaskController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() body: { title: string; description?: string }): Task {
    return this.tasksService.createTask(body.title, body.description);
  }

  @Get()
  findAll(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Task {
    return this.tasksService.getTaskById(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() body: { title?: string; description?: string; status?: TaskStatus },
  ): Task {
    return this.tasksService.updateTask(
      id,
      body.title,
      body.description,
      body.status,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: number): void {
    this.tasksService.deleteTask(id);
  }
}
