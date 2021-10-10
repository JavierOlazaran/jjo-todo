import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todos-list-filters',
  templateUrl: './todos-list-filters.component.html',
  styleUrls: ['./todos-list-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
