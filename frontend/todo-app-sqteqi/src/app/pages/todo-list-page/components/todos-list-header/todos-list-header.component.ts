import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todos-list-header',
  templateUrl: './todos-list-header.component.html',
  styleUrls: ['./todos-list-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
