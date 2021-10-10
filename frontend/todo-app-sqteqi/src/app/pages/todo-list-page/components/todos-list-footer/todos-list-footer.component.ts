import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todos-list-footer',
  templateUrl: './todos-list-footer.component.html',
  styleUrls: ['./todos-list-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListFooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
