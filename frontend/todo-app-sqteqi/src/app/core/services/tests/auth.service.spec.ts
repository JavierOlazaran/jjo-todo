import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const httpMock = {
    post: jest.fn(),
  };
  const credentialsMock = {
    username: 'someuser',
    password: 'somepassword'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        {provide: HttpClient, useValue: httpMock}
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('methods', () => {

    test('should call http method correctly', () => {
      service.login(credentialsMock);
      expect(httpMock.post).toHaveBeenCalledWith(service["authEndpointUrl"]+'/login', credentialsMock);

      service.register(credentialsMock);
      expect(httpMock.post).toHaveBeenCalledWith(service["authEndpointUrl"]+'/register', credentialsMock);
    });
  });
});
