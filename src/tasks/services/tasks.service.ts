import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  createTask(title: string, description?: string): Task {
    const task = new Task();
    task.id = this.idCounter++;
    task.title = title;
    task.description = description;
    task.status = TaskStatus.PENDING;
    task.createdAt = new Date();
    task.updatedAt = new Date();
    this.tasks.push(task);
    return task;
  }

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: number): Task {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  updateTask(
    id: number,
    title?: string,
    description?: string,
    status?: TaskStatus,
  ): Task {
    const task = this.getTaskById(id);
    if (title) task.title = title;
    if (description) task.description = description;
    if (status) task.status = status;
    task.updatedAt = new Date();
    return task;
  }

  deleteTask(id: number): void {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    if (taskIndex === -1) {
      throw new NotFoundException('Task not found');
    }
    this.tasks.splice(taskIndex, 1);
  }
}
