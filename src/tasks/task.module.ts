import { Module } from '@nestjs/common';
import { TaskController } from './controllers/task.controller';
import { TasksService } from './services/tasks.service';

@Module({
  controllers: [TaskController],
  providers: [TasksService],
})
export class TaskModule {}
