import { RegisterUserRequestDTO } from './../models/auth.dtos';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUser: RegisterUserRequestDTO = {
    userName: 'testUser',
    password: 'testPassword'
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('registerUser method ', () => {
    
    test('should should save the new user', () => {
      const registerUserSpy = jest.spyOn(service, "registerUser");
      service.registerUser(mockUser);

      expect(registerUserSpy).toHaveReturnedWith(mockUser.userName);
    })
    
  })
  
});
