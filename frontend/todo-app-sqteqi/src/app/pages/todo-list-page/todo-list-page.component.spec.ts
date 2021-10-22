import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckButtonComponent } from './components/check-button/check-button.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodosListFooterComponent } from './components/todos-list-footer/todos-list-footer.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { SharedModule } from './../../shared/shared.module';
import { ErrorHandlingService } from './../../core/services/error-handling.service';
import { TodosService } from './../../core/services/todos.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list-page.component';
import { TodosListFiltersComponent } from './components/todos-list-filters/todos-list-filters.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  const todosServiceMock = {
    getTodos: jest.fn(),
    deleteTodo: jest.fn(),
    updateTodoStatus: jest.fn(),
    createTodo: jest.fn(),
    deleteCompletedTodos: jest.fn(),
  };
  const errorServiceMock = {
    gotoErrorPage: jest.fn(),
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        NewTodoComponent,
        TodosListFooterComponent,
        TodosListFiltersComponent,
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
