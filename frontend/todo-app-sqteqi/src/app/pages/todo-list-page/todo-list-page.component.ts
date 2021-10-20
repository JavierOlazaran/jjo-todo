import { footerButtonEvent } from './components/todos-list-footer/todos-list-footer.component';
import { TodosService } from './../../core/services/todos.service';
import { Component, OnInit } from '@angular/core';
import { TodoItem } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];

  private footerActionEventsMap;

  constructor(
    private todosSvc: TodosService
  ) {
    this.footerActionEventsMap = new Map<footerButtonEvent, any>([
      ['CLEAR_COMPLETED', this.deleteCompletedTodos],
      ['FILTER_ACTIVE', this.filterActive],
      ['FILTER_COMPLETED', this.filterCompleted],
      ['FILTER_ALL', this.filterAll],
    ]);
  }

  ngOnInit(): void {
    this.getUserTodos();
  }

  onFooterButtonClick(event: footerButtonEvent) {
    this.footerActionEventsMap.get(event)();
  }

  getUserTodos() {
    this.todosSvc.getTodos().subscribe(
      res => {this.todos = res},
      //err =>
    )}

  deleteTodo(itemId: string) {
  }

  updateItemStatus(item: TodoItem) {
    console.log(item);
  }

  createTodo() {

  }

  private deleteCompletedTodos() {
    console.log('delete complete');
  }

  private filterActive() {
    console.log('filter active');

  }

  private filterCompleted() {
    console.log('filter completed');

  }

  private filterAll() {
    console.log('filter all');

  }
}
