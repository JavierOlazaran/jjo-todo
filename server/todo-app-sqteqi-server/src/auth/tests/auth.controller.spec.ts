import { RegisterUserRequestDTO } from './../models/auth.dtos';
import { AuthService } from './../auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  const mockUser: RegisterUserRequestDTO = {
    userName: "mockUser",
    password: "mockPassword"
  }
  const authServiceMock = {
    registerUser: jest.fn((newUser: RegisterUserRequestDTO) => newUser.userName),
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
      controller.registerUser(mockUser);

      expect(createUserSpy).toHaveBeenCalledWith(mockUser);
    })
    
  })
  
});
