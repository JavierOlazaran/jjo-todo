import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/theme-handling/services/theme.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list-page.component.html',
  styleUrls: ['./todo-list-page.component.scss']
})
export class TodoListComponent implements OnInit {

  constructor(
    private theme: ThemeService
  ) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.theme.toggleTheme();
  }
}
