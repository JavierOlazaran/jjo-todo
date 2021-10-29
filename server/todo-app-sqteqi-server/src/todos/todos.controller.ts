import { DataService } from './../mock.db';
import { CreateTodoRequestDTO } from './models/todos.dto';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, Put, UseGuards } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  constructor(
    private todosSvc: TodosService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTodos(@Headers('authorization') authorization: string){
    return await this.todosSvc.getAllTodos(authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':todoId')
  async getTodoById( @Param('todoId') todoId: string,@Headers('authorization') authorization: string) {
    return await this.todosSvc.getTodoById(todoId, authorization);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTodo(@Headers('authorization') authorization: string, @Body() body: CreateTodoRequestDTO) {
    return await this.todosSvc.createTodo(authorization, body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':todoId')
  async updateTodo(@Headers('authorization') authorization: string, @Param('todoId') todoId: string, @Body() body: any) {
    return await this.todosSvc.replaceTodo(authorization, todoId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':todoId')
  async patchTodo(@Headers('authorization') authorization: string, @Param('todoId') todoId: string, @Body() body: any) {
    return await this.todosSvc.runPatchAction(authorization, todoId, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':todoId')
  async deleteTodo(@Headers('authorization') authorization: string, @Param('todoId') todoId: string) {
    return await this.todosSvc.deleteTodo(authorization, todoId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/completed')
  async deleteCompletedTodos(@Headers('authorization') authorization: string) {
    return await this.todosSvc.deleteCompleted(authorization);
  }
}
