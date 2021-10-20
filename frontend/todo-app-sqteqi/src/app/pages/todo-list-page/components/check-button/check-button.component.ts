import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-check-button',
  templateUrl: './check-button.component.html',
  styleUrls: ['./check-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class CheckButtonComponent implements OnInit {

  @Input()
  set checked(value: boolean) {
    this._checked = value;
  }
  get checked(): boolean { return this._checked };
  private _checked: boolean = false;

  @Output() checkClicked = new EventEmitter<boolean>();
  @Output() mouseUp = new EventEmitter<MouseEvent>();

  constructor(
  ) { }

  ngOnInit(): void {
  }

  onButtonClicked() {
    this._checked = !this._checked;
    this.checkClicked.emit(this._checked);
  }

  onMouseup(event: MouseEvent) {
    this.mouseUp.emit(event);
  }
}
