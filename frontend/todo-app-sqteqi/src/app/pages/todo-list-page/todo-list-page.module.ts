import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-page-routing.module';
import { TodoListComponent } from './todo-list-page.component';
import { TodosListHeaderComponent } from './components/todos-list-header/todos-list-header.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { TodosListFooterComponent } from './components/todos-list-footer/todos-list-footer.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosListFiltersComponent } from './components/todos-list-filters/todos-list-filters.component';
import { CheckButtonComponent } from './components/check-button/check-button.component';


@NgModule({
  declarations: [
    TodoListComponent,
    TodosListHeaderComponent,
    NewTodoComponent,
    TodosListFooterComponent,
    TodosListComponent,
    TodosListFiltersComponent,
    CheckButtonComponent
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule
  ]
})
export class TodoListModule { }
