import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { Task } from '../entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/create-task.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'The task has been created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' }) // Respuesta en caso de error
  create(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiResponse({ status: 200, description: 'Get all tasks.' })
  getAll(): Task[] {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a task by id' })
  @ApiResponse({ status: 200, description: 'Get a task by id.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  getOne(@Param('id') id: number): Task {
    const task = this.taskService.getTaskById(id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task by id' })
  @ApiResponse({ status: 200, description: 'The task has been updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  update(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto): Task {
    return this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task by id' })
  @ApiResponse({ status: 204, description: 'The task has been deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  delete(@Param('id') id: number): void {
    this.taskService.deleteTask(id);
  }
}
