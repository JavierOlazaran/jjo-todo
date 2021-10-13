import { Component, OnInit } from '@angular/core';
import { TodoItem } from './components/todo-item/todo-item.component';

@Component({
  selector: 'app-todo-list-page',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [
    {
      itemId: '1',
      status: 'active',
      description: 'lorem ipsum asd 1'
    },
    {
      itemId: '2',
      status: 'active',
      description: 'lorem ipsum gfdfgd 2'
    },
    {
      itemId: '3',
      status: 'active',
      description: 'lorem ipsum dasdaas 3'
    },
    {
      itemId: '4',
      status: 'active',
      description: 'lorem ipsum 4'
    },
    {
      itemId: '5',
      status: 'active',
      description: 'lorem ipsum 5'
    },
    {
      itemId: '6',
      status: 'active',
      description: 'lorem ipsum 6'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
