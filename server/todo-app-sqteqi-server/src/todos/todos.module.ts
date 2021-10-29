import { DataService } from '../data/mock.db.service';
import { DataModule } from './../data/data.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [AuthModule, DataModule],
  controllers: [TodosController],
  providers: [TodosService, DataService],
})
export class TodosModule {}
