import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-main-background-img',
  templateUrl: './main-background-img.component.html',
  styleUrls: ['./main-background-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainBackgroundImgComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
