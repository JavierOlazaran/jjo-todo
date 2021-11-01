import { TodosResponseDTO } from './../../core/models/todos.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckButtonComponent } from './components/check-button/check-button.component';
import { TodoItem, TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosListFooterComponent } from './components/todos-list-footer/todos-list-footer.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { SharedModule } from './../../shared/shared.module';
import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { TodosService } from './../../core/services/todos.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list-page.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const todosServiceMock = {
    getTodos: jest.fn(() => {
      return new Observable(observer => observer.next(todosResponseMock))
    }),
    deleteTodo: jest.fn(() => {
      return new Observable(observer => observer.next())
    }),
    updateTodoStatus: jest.fn(() => {
      return new Observable(observer => observer.next())
    }),
    createTodo: jest.fn(() => {
      return new Observable(observer => observer.next())
    }),
    deleteCompletedTodos: jest.fn(() => {
      return new Observable(observer => observer.next())
    }),
  };
  const errorServiceMock = {
    gotoErrorPage: jest.fn(),
  };

  const todosListMock: TodoItem[] = [
    {
      id: 'todo1',
      description: 'some todo 1',
      status: 'completed'
    },
    {
      id: 'todo3',
      description: 'some todo 3',
      status: 'completed'
    },
    {
      id: 'todo2',
      description: 'some todo 2',
      status: 'active'
    },
    {
      id: 'todo4',
      description: 'some todo 4',
      status: 'active'
    },
    {
      id: 'todo5',
      description: 'some todo 5',
      status: 'active'
    },
    {
      id: 'todo6',
      description: 'some todo 6',
      status: 'active'
    },
  ];

  const todosResponseMock: TodosResponseDTO = {todos: todosListMock};

  const activeTodosMock: TodoItem[] = [
    {
      id: 'todo2',
      description: 'some todo 2',
      status: 'active'
    },
    {
      id: 'todo4',
      description: 'some todo 4',
      status: 'active'
    },
    {
      id: 'todo5',
      description: 'some todo 5',
      status: 'active'
    },
    {
      id: 'todo6',
      description: 'some todo 6',
      status: 'active'
    },
  ];

  const completedTodosMock: TodoItem[] = [
    {
      id: 'todo1',
      description: 'some todo 1',
      status: 'completed'
    },
    {
      id: 'todo3',
      description: 'some todo 3',
      status: 'completed'
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        NewTodoComponent,
        TodosListFooterComponent,
        CheckButtonComponent,
        TodoItemComponent,
        DeleteButtonComponent,
      ],
      providers: [
        { provide: TodosService, useValue: todosServiceMock },
        { provide: ErrorHandlingService, useValue: errorServiceMock}
      ],
      imports:[
        SharedModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('onInit', () => {

    test('should get user\'s todos', () => {
      fixture.detectChanges();

      expect(todosServiceMock.getTodos).toHaveBeenCalled();
      expect(component.userTodos).toEqual(todosListMock);
      expect(component.todos).toEqual(todosListMock);
      expect(component.activeTodosLeft).toEqual(4);
      expect(component['subscriptions'].length).toEqual(1);
    });
  });

  describe('on filter click', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should call the correct filter method and set the value correctly', () => {

      component.onFooterButtonClick('FILTER_ACTIVE');
      expect(component.todos).toEqual(activeTodosMock);

      component.onFooterButtonClick('FILTER_COMPLETED');
      expect(component.todos).toEqual(completedTodosMock);

      component.onFooterButtonClick('FILTER_ALL');
      expect(component.todos).toEqual(todosListMock);
    });
  });

  describe('clearCompleted', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should call deleteComplete endpoint, getUserTodos and set userTodos property to that response', () => {
      const deleteCompletedSpy = jest.spyOn(todosServiceMock, 'deleteCompletedTodos');
      const getUserTodosSpy = jest.spyOn(component, 'getUserTodos');
      todosServiceMock.getTodos.mockReturnValue(new Observable(observer => {
        observer.next({todos: activeTodosMock});
      }));

      component.clearCompleted();

      expect(getUserTodosSpy).toHaveBeenCalled();
      expect(deleteCompletedSpy).toHaveBeenCalled();
      expect(component.userTodos).toEqual(activeTodosMock);
    });
  });

  describe('deleteTodo', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should call deleteTodo endpoint, getTodos and update the todos correctly', () => {
      const deleteTodoSpy = jest.spyOn(todosServiceMock, 'deleteTodo');
      const getUserTodosSpy = jest.spyOn(component, 'getUserTodos');
      todosServiceMock.getTodos.mockReturnValue(new Observable(observer => {
        observer.next({todos: todosListMock.filter(item => item.id !== 'todo1')});
      }));

      component.deleteTodo('todo1');

      expect(deleteTodoSpy).toHaveBeenCalledWith('todo1');
      expect(getUserTodosSpy).toHaveBeenCalled();
      expect(component.todos.includes({
        id: 'todo1',
        description: 'some todo 1',
        status: 'completed'
      })).toBeFalsy();
    });
  });

  describe('updateItemStatus', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should call updateTodo, getTodos and update the todos correctly', () => {
      const getUserTodosSpy = jest.spyOn(component, 'getUserTodos');
      const updateTodoStatusSpy = jest.spyOn(todosServiceMock, 'updateTodoStatus');
      todosServiceMock.getTodos.mockReturnValue(new Observable(observer => {
        observer.next({todos: todosListMock.map(item => {
          if (item.id === 'todo1') { return item = {...item, status: 'active'}}
          return item;
        })});
      }));

      component.updateItemStatus(todosListMock[0]);

      expect(getUserTodosSpy).toHaveBeenCalled();
      expect(updateTodoStatusSpy).toHaveBeenCalledWith(todosListMock[0]);
      expect(component.todos[0]).toEqual({...todosListMock[0], status: 'active'});
    });
  });

  describe('createTodo', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should should call createTodo endpoint, getTodos and update the todos correctly', () => {
      const newTodoMock: TodoItem = {id: 'newTodo', description: 'some description', status: 'active'};
      const getUserTodosSpy = jest.spyOn(component, 'getUserTodos');
      const createTodoSpy = jest.spyOn(todosServiceMock, 'createTodo');
      todosServiceMock.getTodos.mockReturnValue(new Observable(observer => {
        observer.next({todos: todosListMock.concat(newTodoMock)});
      }));

      component.createTodo(newTodoMock);

      expect(getUserTodosSpy).toHaveBeenCalled();
      expect(createTodoSpy).toHaveBeenCalledWith(newTodoMock);
      expect(component.todos.length).toEqual(todosListMock.length + 1);
      expect(component.todos.includes(newTodoMock)).toBeTruthy();
    });
  });

  describe('on calling error', () => {

    test('should call error service on createTodo error responses', () => {
      const newTodoMock: TodoItem = {id: 'newTodo', description: 'some description', status: 'active'};
      todosServiceMock.createTodo.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.createTodo(newTodoMock);

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });


    test('should call error service on createTodo error responses', () => {
      const newTodoMock: TodoItem = {id: 'newTodo', description: 'some description', status: 'active'};
      todosServiceMock.createTodo.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.createTodo(newTodoMock);

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });

    test('should call error service on deleteTodo error responses', () => {
      todosServiceMock.deleteTodo.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.deleteTodo('todo1');

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });

    test('should call error service on updateItemStatus error responses', () => {
      todosServiceMock.updateTodoStatus.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.updateItemStatus(todosListMock[0]);

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });

    test('should call error service on deleteCompletedTodos error responses', () => {
      todosServiceMock.deleteCompletedTodos.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.clearCompleted();

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });

    test('should call error service on getTodos error responses', () => {
      todosServiceMock.getTodos.mockReturnValue(new Observable(observer => {
        observer.error(new HttpErrorResponse({status: 500}));
      }));

      component.getUserTodos();

      expect(errorServiceMock.gotoErrorPage).toHaveBeenCalled();
    });
  });

  describe('Drag and drop', () => {

    test('should register the item being dragged', () => {
      component.onDragStart(2);
      expect(component.draggingIndex).toEqual(2);

      component.onDragStart(4);
      expect(component.draggingIndex).toEqual(4);

      component.onDragStart(0);
      expect(component.draggingIndex).toEqual(0);
    });
  });

  test('should call reorder every time drags enters a different item', () => {
    const reorderItemSpy = jest.spyOn<any, any>(component, 'reorderItem');
    component.draggingIndex = 1;
    component.onDragEnter(1);

    expect(reorderItemSpy).not.toHaveBeenCalled();

    component.draggingIndex = 3;
    component.onDragEnter(1);

    expect(reorderItemSpy).toHaveBeenCalledWith(3, 1);
  });

  test('should nullify draggingIndex on drag end', () => {
    component.draggingIndex = 8;
    component.onDragEnd();

    expect(component.draggingIndex).toEqual(NaN);
  });
});
