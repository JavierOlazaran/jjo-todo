import { TodosService } from './../todos.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from '../todos.controller';

describe('TodosController', () => {
  let controller: TodosController;
  const todosSvcMock = {
    getAllTodos: jest.fn(),
    getTodoById: jest.fn(),
    createTodo: jest.fn(),
    replaceTodo: jest.fn(),
    runPatchAction: jest.fn(),
    deleteCompleted: jest.fn(),
    deleteTodo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        { provide: TodosService, useValue: todosSvcMock}
      ]
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call getAllTodosMethod', () => {
    controller.getAllTodos('someAuthToken');

    expect(todosSvcMock.getAllTodos).toHaveBeenCalledWith('someAuthToken');
  });

  it('should call getTodoById', () => {
    controller.getTodoById('todo1', 'someAuthToken');

    expect(todosSvcMock.getTodoById).toHaveBeenCalledWith('todo1', 'someAuthToken');
  });

  it('should call createTodo', () => {
    const newTodoMock = {
      description: 'some todo description',
      status: 'active'
    }
    controller.createTodo (
      'todo1',
      newTodoMock
    );

    expect(todosSvcMock.createTodo).toHaveBeenCalledWith('todo1', newTodoMock);
  });

  it('should call updateTodo', () => {
    const newTodoMock = {
      description: 'some todo description',
      status: 'active'
    }
    controller.updateTodo (
      'someToken',
      'todo1',
      newTodoMock
    );

    expect(todosSvcMock.replaceTodo).toHaveBeenCalledWith('someToken','todo1', newTodoMock);
  });

  it('should call patchTodo', () => {
    const patchOption = {
      op: 'some_option',
      value: 'some new value'
    }
    controller.patchTodo (
      'someToken',
      'todo1',
      patchOption
    );

    expect(todosSvcMock.runPatchAction).toHaveBeenCalledWith('someToken','todo1', patchOption);
  });

  it('should call delete', () => {
    controller.deleteTodo (
      'someToken',
      'todo1',
    );

    expect(todosSvcMock.deleteTodo).toHaveBeenCalledWith('someToken','todo1');
  });

  it('should call completed', () => {
    controller.deleteCompletedTodos ('someToken');

    expect(todosSvcMock.deleteCompleted).toHaveBeenCalledWith('someToken');
  });
});
