import { AuthService } from './../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  const mockUser = {
    userName: "mockUser",
    password: "mockPassword"
  }
  const authServiceMock = {
    registerUser: jest.fn((newUser) => newUser.userName),
    login: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {provide: AuthService, useValue: authServiceMock}
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('Register user endpoint', () => {
    
    test('should call registerUser method from auth service', () => {
      const createUserSpy = jest.spyOn(authServiceMock, "registerUser");
      controller.register(mockUser);

      expect(createUserSpy).toHaveBeenCalledWith(mockUser);
    });
    
    test('should call registerUser method from auth service', () => {
      const loginSpy = jest.spyOn(authServiceMock, 'login');
      controller.login(mockUser);

      expect(loginSpy).toHaveBeenCalledWith(mockUser);
    });    
  });
});
