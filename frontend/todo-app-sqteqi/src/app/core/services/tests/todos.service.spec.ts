import { TodoItem } from './../../../pages/todo-list-page/components/todo-item/todo-item.component';
import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TodosService } from '../todos.service';

describe('TodosService', () => {
  let service: TodosService;
  const httpClientMock = {
    post: jest.fn(),
    get: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  };
  const todoItemMock: TodoItem = {
    id: 'todo1',
    description: 'some description',
    status: 'active'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('methods', () => {

    test('should call http method correctly', () => {
      service.getTodos();
      expect(httpClientMock.get).toHaveBeenCalledWith(service["todosUrl"]);

      service.deleteTodo('todo1');
      expect(httpClientMock.delete).toHaveBeenCalledWith(service["todosUrl"]+'/'+'todo1');

      service.createTodo(todoItemMock);
      expect(httpClientMock.post).toHaveBeenCalledWith(service["todosUrl"], todoItemMock);

      service.updateTodoStatus(todoItemMock);
      expect(httpClientMock.patch).toHaveBeenCalledWith(
        service["todosUrl"]+'/'+todoItemMock.id,
        {op: 'update_status', value: todoItemMock.status}
      );

      service.deleteCompletedTodos();
      expect(httpClientMock.delete).toHaveBeenCalledWith(service["todosUrl"]+'/delete/completed');
    });
  });
});
