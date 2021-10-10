import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosListHeaderComponent } from './todos-list-header.component';

describe('TodosListHeaderComponent', () => {
  let component: TodosListHeaderComponent;
  let fixture: ComponentFixture<TodosListHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodosListHeaderComponent ]
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
});
