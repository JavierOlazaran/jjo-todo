import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckButtonComponent } from './check-button.component';

describe('CheckButtonComponent', () => {
  let component: CheckButtonComponent;
  let fixture: ComponentFixture<CheckButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On unchecked button clicked', () => {

    test('should set checked property to true', () => {
      component.checked = false;
      const button = fixture.nativeElement.querySelector('.check__btn');
      button.click();

      expect(component.checked).toBeTruthy();
    });

    test('should set checked class on button element', () => {
      component.checked = false;
      let buttonDebugE = fixture.debugElement.query(By.css('.check__btn'));
      let buttonNativeE = fixture.nativeElement.querySelector('.check__btn');

      expect(buttonDebugE.classes["checked"]).toBe(false);
      expect(buttonDebugE.classes["unchecked"]).toBe(true);

      buttonNativeE.click();
      fixture.detectChanges()

      expect(buttonDebugE.classes["checked"]).toBeTruthy();
      expect(buttonDebugE.classes["unchecked"]).toBeFalsy();
    })

    test('should emit true', () => {
      component.checked = false;
      const outputSpy = jest.spyOn(component.checkClicked, "emit");
      let buttonNativeE = fixture.nativeElement.querySelector('.check__btn');

      buttonNativeE.click();
      fixture.detectChanges();
      expect(outputSpy).toHaveBeenCalledWith(true);
    })

  });

  describe('On checked button clicked', () => {

    test('should set checked property to true', () => {
      component.checked = true;
      const button = fixture.nativeElement.querySelector('.check__btn');
      button.click();

      expect(component.checked).toBeFalsy();
    });

    test('should set checked class on button element', () => {
      component.checked = true;
      let buttonDebugE = fixture.debugElement.query(By.css('.check__btn'));
      let buttonNativeE = fixture.nativeElement.querySelector('.check__btn');

      buttonNativeE.click();
      fixture.detectChanges();

      expect(buttonDebugE.classes["checked"]).toBeFalsy();
      expect(buttonDebugE.classes["unchecked"]).toBeTruthy();
    })

    test('should emit true', () => {
      component.checked = true;
      const outputSpy = jest.spyOn(component.checkClicked, "emit");
      let buttonNativeE = fixture.nativeElement.querySelector('.check__btn');

      buttonNativeE.click();
      fixture.detectChanges();
      expect(outputSpy).toHaveBeenCalledWith(false);
    })
  });

  describe('on mouseUp', () => {

    test('should emit the mouseUpEvent', () => {
      const onMouseupSpy = jest.spyOn(component, 'onMouseup');
      const mouseUpOutputSpy = jest.spyOn(component.mouseUp, 'emit');
      let buttonDebugE = fixture.debugElement.query(By.css('.check__btn'));

      buttonDebugE.triggerEventHandler('mouseup', {});

      expect(onMouseupSpy).toHaveBeenCalled()
      expect(mouseUpOutputSpy).toHaveBeenCalled()
    });
  });
});
