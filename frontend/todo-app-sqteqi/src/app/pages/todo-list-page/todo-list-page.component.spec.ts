import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { TodosListFiltersComponent } from './components/todos-list-filters/todos-list-filters.component';
import { TodosListFooterComponent } from './components/todos-list-footer/todos-list-footer.component';
import { TodosListHeaderComponent } from './components/todos-list-header/todos-list-header.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

import { TodoListComponent } from './todo-list-page.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoListComponent,
        TodosListHeaderComponent,
        NewTodoComponent,
        TodosListFooterComponent,
        TodosListComponent,
        TodosListFiltersComponent
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
