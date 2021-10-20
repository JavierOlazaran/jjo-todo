import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItem, TodoItemComponent } from './todo-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;
  let itemActiveMock: TodoItem = {
    id: 'someId',
    status: 'active',
    description: 'lorem ipsum'
  };
  let itemCompletedMock: TodoItem = {
    id: 'someId',
    status: 'completed',
    description: 'lorem ipsum'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TodoItemComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.todoItem = itemActiveMock;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('On init', () => {

    test('should set the description with active styles when status is active', () => {
      component.todoItem = itemActiveMock;
      fixture.detectChanges();
      const descriptionElement = fixture.debugElement.query(By.css('.todo__description'));

      expect(descriptionElement.classes['todo--active']).toBe(true);
      expect(descriptionElement.classes['todo--completed']).toBe(false);
    })

    test('should set the description with completed styles when status is completed', () => {
      component.todoItem = itemCompletedMock;
      const descriptionElement = fixture.debugElement.query(By.css('.todo__description'));
      fixture.detectChanges();

      expect(descriptionElement.classes['todo--active']).toBe(false);
      expect(descriptionElement.classes['todo--completed']).toBe(true);
    })

  });

  describe('On check button click event', () => {

    test('should update the status value of the todo item from active to completed', () => {
      component.todoItem = itemActiveMock;
      fixture.detectChanges();

      expect(component.todoItem.status).toEqual('active');

      component.onCheckButtonClick(true);

      expect(component.todoItem.status).toEqual('completed');
    });

    test('should update the status value of the todo item from completed to active', () => {
      component.todoItem = itemCompletedMock;
      fixture.detectChanges();

      expect(component.todoItem.status).toEqual('completed');

      component.onCheckButtonClick(false);

      expect(component.todoItem.status).toEqual('active');
    });

    test('should emit todo item with the new status value', () => {
      const statusChangedSpy = jest.spyOn(component.itemStatusChanged, 'emit');
      component.todoItem = itemCompletedMock;
      fixture.detectChanges();

      expect(component.todoItem.status).toEqual('completed');

      component.onCheckButtonClick(false);

      expect(statusChangedSpy).toHaveBeenCalledWith(itemActiveMock);

      component.todoItem = itemActiveMock;
      fixture.detectChanges();

      expect(component.todoItem.status).toEqual('active');

      component.onCheckButtonClick(true);

      expect(statusChangedSpy).toHaveBeenCalledWith(itemCompletedMock);
    })

  });

  describe('on delete click event', () => {

    test('should emit item id', () => {
      const onDeleteSpy = jest.spyOn(component.itemDeleted, 'emit');
      component.todoItem = itemActiveMock;
      fixture.detectChanges();

      component.onDeleteButtonClick();

      expect(onDeleteSpy).toHaveBeenCalledWith(itemActiveMock.id);
    })

  })


});
