import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTodoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
