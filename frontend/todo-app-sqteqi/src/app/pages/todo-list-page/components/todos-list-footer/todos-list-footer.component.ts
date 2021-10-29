import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

export type footerButtonEvent =
  | 'FILTER_ALL'
  | 'FILTER_ACTIVE'
  | 'FILTER_COMPLETED';
@Component({
  selector: 'app-todos-list-footer',
  templateUrl: './todos-list-footer.component.html',
  styleUrls: ['./todos-list-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosListFooterComponent implements OnInit {

  @Input()
  set totalItems(value: number) {
    this._totalItems = value;
  }
  get totalItems(): number {
    return this._totalItems;
  }
  private _totalItems = 0;
  activeFilter: string = '';

  @Output() filterButtonEvent = new EventEmitter<footerButtonEvent>();
  @Output() clearCompleted = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onButtonEvent(event: footerButtonEvent) {
    this.activeFilter = event;
    this.filterButtonEvent.emit(event);
  }

  onClearCompleteClick() {
    this.clearCompleted.emit();
  }
}
