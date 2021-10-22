import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-page-routing.module';
import { TodoListComponent } from './todo-list-page.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { TodosListFooterComponent } from './components/todos-list-footer/todos-list-footer.component';
import { CheckButtonComponent } from './components/check-button/check-button.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';


@NgModule({
  declarations: [
    TodoListComponent,
    NewTodoComponent,
    TodosListFooterComponent,
    CheckButtonComponent,
    TodoItemComponent,
    DeleteButtonComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    TodoListRoutingModule,
    ReactiveFormsModule
  ]
})
export class TodoListModule { }
