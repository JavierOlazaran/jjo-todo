import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TodosListFooterComponent } from './todos-list-footer.component';

describe('TodosListFooterComponent', () => {
  let component: TodosListFooterComponent;
  let fixture: ComponentFixture<TodosListFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosListFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Filter buttons', () => {

    beforeEach(() => {
      fixture.detectChanges();
    });

    test('should send the corresponding event', () => {
      const filterAllButton = fixture.nativeElement.querySelector('#filter_all_btn');
      const filterActiveButton = fixture.nativeElement.querySelector('#filter_active_btn');
      const filterCompletedButton = fixture.nativeElement.querySelector('#filter_completed_btn');

      const filterButtonEventSpy = jest.spyOn(component.filterButtonEvent, 'emit');

      filterAllButton.click();
      expect(filterButtonEventSpy).toHaveBeenCalledWith('FILTER_ALL');

      filterActiveButton.click();
      expect(filterButtonEventSpy).toHaveBeenCalledWith('FILTER_ACTIVE');

      filterCompletedButton.click();
      expect(filterButtonEventSpy).toHaveBeenCalledWith('FILTER_COMPLETED');
    });
  });

  describe('Clear complete button', () => {

    test('should emit clearCompleted', () => {
      const filterActiveButton = fixture.nativeElement.querySelector('#clear_completed_btn');
      const clearCompletedSpy = jest.spyOn(component.clearCompleted, 'emit');

      filterActiveButton.click();
      expect(clearCompletedSpy).toHaveBeenCalled();
    });
  });
});
