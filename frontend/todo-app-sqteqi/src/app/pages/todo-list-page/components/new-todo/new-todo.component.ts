import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class NewTodoComponent implements OnInit {

  // TODO: Other validations such as max length are something to consider
  newTodoForm = new FormGroup({
    description: new FormControl('', [Validators.required])
  })

  @Output() sendNewTodo = new EventEmitter()
  checked = false;

  constructor() { }

  ngOnInit(): void {
  }

  get description() { return this.newTodoForm.get('description') }

  submitTodo() {
    this.checked = true;

    if (this.newTodoForm.valid) {
      this.sendNewTodo.emit({description: this.description?.value, status: 'active'});
      this.newTodoForm.reset({onlySelf: true});
    }
  }

  onBtnMouseup() {
    setTimeout(() => {
      this.checked = false;
    }, 300)
  }
}
