import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBackgroundImgComponent } from './main-background-img.component';

describe('MainBackgroundImgComponent', () => {
  let component: MainBackgroundImgComponent;
  let fixture: ComponentFixture<MainBackgroundImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainBackgroundImgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBackgroundImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
