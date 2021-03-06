import { Subscription } from 'rxjs';
import { ErrorHandlingService } from '../../core/services/error/error-handling.service';
import { footerButtonEvent } from './components/todos-list-footer/todos-list-footer.component';
import { TodosService } from './../../core/services/todos.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoItem } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  todos: TodoItem[] = [];
  userTodos: TodoItem[] = [];
  activeTodosLeft: number = 0;

  draggingIndex!: number;
  private footerActionEventsMap: Map<footerButtonEvent, any>;

  constructor(
    private todosSvc: TodosService,
    private errorSvc: ErrorHandlingService
  ) {

    this.footerActionEventsMap = new Map<footerButtonEvent, any>([
      ['FILTER_ACTIVE', this.filterActive],
      ['FILTER_COMPLETED', this.filterCompleted],
      ['FILTER_ALL', this.filterAll],
    ]);
  }

  ngOnInit(): void {
    this.getUserTodos();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onFooterButtonClick(event: any) {
      this.todos = this.footerActionEventsMap.get(event)(this.userTodos);
  }

  clearCompleted() {
    this.deleteCompletedTodos();
  }

  // TODO: It should be considered the need to implement some sort of pagination or infinite virtual scrolling
  getUserTodos() {
    const getTodosSUb = this.todosSvc.getTodos().subscribe(
      res => {
        this.userTodos = res.todos;
        this.todos = this.userTodos;
        this.setActiveItemsCount();
      },
      err => {this.errorSvc.handleError()}
    );
    this.subscriptions.push(getTodosSUb);
  }

  deleteTodo(itemId: string) {
    this.todosSvc.deleteTodo(itemId).subscribe(
      res => this.getUserTodos(),
      err => this.errorSvc.handleError()
    );
  }

  updateItemStatus(item: TodoItem) {
    this.todosSvc.updateTodoStatus(item).subscribe(
      res => this.getUserTodos(),
      err => this.errorSvc.handleError(),
    );
  }

  createTodo(newTodo: any) {
    this.todosSvc.createTodo(newTodo).subscribe(
      res => this.getUserTodos(),
      err => this.errorSvc.handleError()
    );
  }

  private deleteCompletedTodos() {
    this.todosSvc.deleteCompletedTodos().subscribe(
      res => this.getUserTodos(),
      err => this.errorSvc.handleError()
    );
  }

  // TODO: If some kind of pagination is implemented, this functionality should involve
  // BE calls with filters as query parameters.
  private filterActive(todos: TodoItem[]) {
    return todos.filter(item => item.status === 'active');
  }

  private filterCompleted(todos: TodoItem[]) {
    return todos.filter(item => item.status === 'completed');
  }

  private filterAll(todos: TodoItem[]) {
    return todos;
  }

  setActiveItemsCount() {
    this.activeTodosLeft = this.userTodos.filter(item => item.status === 'active').length;
  }

  onDragStart(event: any) {
    this.draggingIndex = event;
  }

  onDragEnter(toIndex: number): void {
    if (this.draggingIndex !== toIndex) {
      this.reorderItem(this.draggingIndex, toIndex);
    }
  }

  onDragEnd(): void {
    this.draggingIndex = NaN;
  }

  // TODO: This functionality should probably implement a BE functionality to update the order in the DB
  // I would probably create an order field.
  private reorderItem(fromIndex: number, toIndex: number): void {
    const itemToBeReordered = this.todos.splice(fromIndex, 1)[0];
    this.todos.splice(toIndex, 0, itemToBeReordered);
    this.draggingIndex = toIndex;
  }
}
