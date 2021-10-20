import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

export type footerButtonEvent = 'FILTER_ALL'
                              | 'FILTER_ACTIVE'
                              | 'FILTER_COMPLETED'
                              | 'CLEAR_COMPLETED';
@Component({
  selector: 'app-todos-list-footer',
  templateUrl: './todos-list-footer.component.html',
  styleUrls: ['./todos-list-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosListFooterComponent implements OnInit {

  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
  };
  get totalItems(): number {
    return this._totalItems;
  }
  private _totalItems = 0;

  @Output() buttonEvent = new EventEmitter<footerButtonEvent>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonEvent(event: footerButtonEvent) {
    this.buttonEvent.emit(event);
  }
}
