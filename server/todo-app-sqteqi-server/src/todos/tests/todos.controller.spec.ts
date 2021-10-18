import { TodosService } from './../todos.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from '../todos.controller';

describe('TodosController', () => {
  let controller: TodosController;
  let todosSvc: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [TodosService]
    }).compile();

    controller = module.get<TodosController>(TodosController);
    todosSvc = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
