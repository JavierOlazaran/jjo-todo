import { JwtAuthGuard } from './../auth/guards/jwt-auth.guard';
import { Controller, Delete, Get, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTodos(@Request()  req) {
    return 'all todos';
  }

  @Get(':todoId')
  getTodoById() {
    return 'todo';
  }

  @Post()
  createTodo() {
    return 'new todo';
  }

  @Put(':todoId')
  updateTodo() {
    return 'updated todo';
  }

  @Patch(':todoId')
  editTodo() {
    return 'edited todo';
  }

  @Delete(':todoId')
  deleteTodo() {
    return 'todo deleted';
  }
}
