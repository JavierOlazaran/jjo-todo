import { UserService } from './../../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUser = {
    userName: 'testUser',
    password: 'testPassword'
  }
  const jwtServiceMock = {
    sign: jest.fn((userObj: {user: string}): string => {
      return 'tokenized' + userObj.user;
    }),
    decode: jest.fn()
  };
  const userSvcMock = {
    findUser: jest.fn((user: any) => {
      if (user.userName === 'badUser') return null;
      if (user.userName === 'testUser') return user.userName;
    }),
    saveNewUser: jest.fn((user: any) => {
      return user.userName;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
        { provide: UserService, useValue: userSvcMock}
      ],

    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should should save the new user', () => {
    service.registerUser(mockUser);

    expect(userSvcMock.saveNewUser).toHaveBeenCalledWith(mockUser);
    expect(userSvcMock.saveNewUser).toHaveReturnedWith(mockUser.userName);
  });

  test('should should save the new user', () => {
    service.registerUser(mockUser);

    expect(userSvcMock.saveNewUser).toHaveBeenCalledWith(mockUser);
    expect(userSvcMock.saveNewUser).toHaveReturnedWith(mockUser.userName);
  });

  test('should call login user', () => {
    service.login(mockUser.userName).then(response => {
      expect(response).toEqual({access_token: 'tokenizedtestUser'});
    });

    expect(jwtServiceMock.sign).toHaveBeenCalledWith({user: mockUser.userName});
  });

  test('should call validate user', () => {
    userSvcMock.findUser.mockImplementation((username: string) => {
      if (username === 'goodUser') return { userName: 'goodUser', password: 'goodPassword'};
      if (username === 'badUser') return { userName: 'badUser', password: 'goodPassword'};
      if (username === 'noUser') return null;
    });

    service.validateCredentials('goodUser', 'goodPassword').then(response => {
      expect(userSvcMock.findUser).toHaveBeenCalledWith('goodUser');
      expect(response).toEqual('goodUser');
    });

    service.validateCredentials('badUser', 'badPassword').then(response => {
      expect(userSvcMock.findUser).toHaveBeenCalledWith('badUser');
      expect(response).toEqual(null);
    });

    service.validateCredentials('noUser', 'somePassword').then(response => {
      expect(userSvcMock.findUser).toHaveBeenCalledWith('noUser');
      expect(response).toEqual(null);
    });
  });

  test('should call decode method', () => {
    service.retrieveJwtPayload('someToken');

    expect(jwtServiceMock.decode).toHaveBeenCalledWith('someToken');
  });
});
