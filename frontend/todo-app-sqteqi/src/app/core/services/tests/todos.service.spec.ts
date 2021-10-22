import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { TodosService } from '../todos.service';

describe('TodosService', () => {
  let service: TodosService;
  const httpClientMock = {
    post: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientMock}
      ]
    });
    service = TestBed.inject(TodosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
