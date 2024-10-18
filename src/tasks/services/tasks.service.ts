import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './../entities/task.entity';
import { TaskStatus } from '../enums/task-status.enum';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description, status } = createTaskDto;
    const task = new Task();
    task.id = this.idCounter++;
    task.title = title;
    task.description = description;
    task.status = status || TaskStatus.PENDING;
    task.createdAt = new Date();
    task.updatedAt = new Date();
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find((t) => t.id == id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  updateTask(id: number, changes: UpdateTaskDto): Task {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }

    const task = this.tasks[taskIndex];

    this.tasks[taskIndex] = {
      ...task,
      ...changes,
    };

    return this.tasks[taskIndex];
  }

  deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
  }
}
