import { HttpException } from '@nestjs/common';
import { DataService } from '../../data/mock.db.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';

describe('UserService', () => {
  let service: UserService;
  const dataSvcMock = {
    db: [
      {
        username: 'user1',
        password: '12345',
        todos: [
          {
            id: 'todo1',
            description: 'some todo 1',
            status: 'completed'
          },
          {
            id: 'todo2',
            description: 'some todo 2',
            status: 'active'
          },
          {
            id: 'todo3',
            description: 'some todo 3',
            status: 'completed'
          },
          {
            id: 'todo4',
            description: 'some todo 4',
            status: 'active'
          },
          {
            id: 'todo5',
            description: 'some todo 5',
            status: 'active'
          },
          {
            id: 'todo6',
            description: 'some todo 6',
            status: 'active'
          }
        ]
      },
      {
        username: 'user2',
        password: '12345',
        todos: [
          {
            id: 'todo1',
            description: 'some todo 1',
            status: 'completed'
          },
          {
            id: 'todo4',
            description: 'some todo 4',
            status: 'active'
          },
          {
            id: 'todo5',
            description: 'some todo 5',
            status: 'active'
          },
          {
            id: 'todo6',
            description: 'some todo 6',
            status: 'active'
          }
        ]
      }
    ]
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: DataService, useValue: dataSvcMock }
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should should find user',async  () => {
    await service.findUser('user1').then(response => {
      expect(response).toEqual(dataSvcMock.db[0]);
    });

    await service.findUser('nonExistentUser').then(response => {
      expect(response).toBeFalsy();
    });
  });

  test('should not save user and return a 403 error code', async () => {
    const newUserToAdd = {username: 'user1', password: 'someOtherPassword'}
    const previousDBStatus = dataSvcMock.db;

    await service.saveNewUser(newUserToAdd)
    .then(response => {
      fail('403 Exception expected')
    })
    .catch(err => {
      expect(dataSvcMock.db).toEqual(previousDBStatus);
      expect(err).toEqual(new HttpException('User already exists', 403));
    })
  })
  

  test('should save user', async () => {
    const expectedNewUser = {username: 'newUser', password: 'newPassword', todos: []};

    expect(dataSvcMock.db.find(user => user.username === 'newUser')).toBeFalsy();
    expect(dataSvcMock.db.length).toEqual(2);

    await service.saveNewUser({username: 'newUser', password: 'newPassword'}).then(response => {

      expect(dataSvcMock.db.find(user => user.username === 'newUser')).toEqual(expectedNewUser);
      expect(dataSvcMock.db.length).toEqual(3);
      expect(response).toEqual(expectedNewUser.username);
    });
  })
});
