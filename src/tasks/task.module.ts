import { Module } from '@nestjs/common';
import { TaslController } from './task.controller';
import { TasksService } from './tasks.service';

@Module({
  controllers: [TaslController],
  providers: [TasksService],
})
export class TaskModule {}
