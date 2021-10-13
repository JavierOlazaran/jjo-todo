import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

export interface TodoItem {
  itemId: string;
  status: 'active' | 'completed',
  description: string,
}
@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodoItemComponent implements OnInit {

  @Input() todoItem!: TodoItem;
  @Output() itemStatusChanged = new EventEmitter<TodoItem>();
  @Output() itemDeleted = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {}

  onCheckButtonClick(status: boolean) {
    this.todoItem = {...this.todoItem, status: status ? 'completed' : 'active'};

    this.itemStatusChanged.emit(this.todoItem)
  }

  onDeleteButtonClick() {
    this.itemDeleted.emit(this.todoItem.itemId);
  }
}
