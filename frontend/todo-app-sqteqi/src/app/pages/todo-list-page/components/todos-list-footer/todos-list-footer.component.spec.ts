import { ComponentFixture, TestBed } from '@angular/core/testing';

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
});
