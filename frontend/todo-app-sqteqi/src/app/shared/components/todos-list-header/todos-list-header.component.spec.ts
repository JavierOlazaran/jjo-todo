import { ThemeService } from './../../../core/theme-handling/services/theme.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListHeaderComponent } from './todos-list-header.component';

describe('TodosListHeaderComponent', () => {
  let component: TodosListHeaderComponent;
  let fixture: ComponentFixture<TodosListHeaderComponent>;
  let themeServiceMock = {
    toggleTheme: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosListHeaderComponent ],
      providers: [
        { provide: ThemeService, useValue: themeServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Toggle theme button', () => {

    test('should trigger toggleTheme method', () => {
      const toggleFNSpy = jest.spyOn(component, "toggleTheme");
      const toggleButton = fixture.debugElement.nativeElement.querySelector('.theme__toggle__btn');
      toggleButton.click();

      expect(toggleFNSpy).toHaveBeenCalled();
    })

  });
});
