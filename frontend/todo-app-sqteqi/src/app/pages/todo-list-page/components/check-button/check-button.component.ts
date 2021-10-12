import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-check-button',
  templateUrl: './check-button.component.html',
  styleUrls: ['./check-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckButtonComponent implements OnInit {

  checked: boolean = false;
  @Output() checkClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onButtonClicked() {
    this.checked = !this.checked;
    this.checkClicked.emit(this.checked);
  }
}
