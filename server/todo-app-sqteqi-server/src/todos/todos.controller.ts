import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('todos')
export class TodosController {
  @Get()
  getAllTodos() {
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
