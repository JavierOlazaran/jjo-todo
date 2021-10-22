import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick } from '@angular/core/testing';

import { NewTodoComponent } from './new-todo.component';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ NewTodoComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Submit', () => {

    test('should emit only if form is valid', () => {
      fixture.detectChanges();
      const emitTodoSpy = jest.spyOn(component.sendNewTodo, 'emit');
      const formResetSpy = jest.spyOn(component.newTodoForm, 'reset');

      component.submitTodo()

      expect(component.checked).toBeTruthy();
      expect(emitTodoSpy).not.toHaveBeenCalled();

      component.checked = false;
      component.description?.setValue('something');
      fixture.detectChanges();
      component.submitTodo();

      expect(component.checked).toBeTruthy();
      expect(emitTodoSpy).toHaveBeenCalledWith({description: 'something', status: 'active'});
      expect(formResetSpy).toHaveBeenCalledWith({onlySelf: true});
    });
  });

  describe('onBtnMouseUp', () => {

    test('should set checked to false after some time',fakeAsync (() => {
      component.checked = true;

      component.onBtnMouseup();
      tick(500);

      fixture.whenStable().then(() => {
        expect(component.checked).toBeFalsy();
      });
    }));
  });
});
