import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListFiltersComponent } from './todos-list-filters.component';

describe('TodosListFiltersComponent', () => {
  let component: TodosListFiltersComponent;
  let fixture: ComponentFixture<TodosListFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosListFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosListFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
