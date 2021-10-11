import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThemeService } from 'src/app/core/theme-handling/services/theme.service';

@Component({
  selector: 'app-todos-list-header',
  templateUrl: './todos-list-header.component.html',
  styleUrls: ['./todos-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListHeaderComponent implements OnInit {

  constructor(
    private themeSvc: ThemeService
  ) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.themeSvc.toggleTheme();
  }

}
