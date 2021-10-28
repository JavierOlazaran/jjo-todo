import { AuthService } from './../../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos.service';
import { db } from '../../mock.db';

describe('TodosService', () => {
  let service: TodosService;
  jest.mock('../../mock.db.ts', () => (
    [
      {
        userName: 'user1',
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
      }
    ]
  ));

  const userTodosMock = [
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

  const authServiceMock = {
    getUserNameFromToken: jest.fn().mockReturnValue('user1'),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        { provide: AuthService, useValue: authServiceMock }
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should getAllTodos', () => {
    service.getAllTodos('someToken').then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual(userTodosMock);
    });
  });

  test('should get todoById', () => {
    service.getTodoById('todo2', 'someToken').then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual(
        {
          id: 'todo2',
          description: 'some todo 2',
          status: 'active'
        }
      );
    });
  });

  test('should create todo', () => {
    service.createTodo('someToken', {description: 'this is a new todo', status: 'active'}).then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response.description).toEqual('this is a new todo');
    });
  });

  test('should replace todo', () => {
    service.replaceTodo('someToken', 'todo2', {description: 'updated description', status: 'active'}).then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({
        id: 'todo2',
        description: 'updated description',
        status: 'active'
      });
    });
  });

  test('should patch action', () => {
    authServiceMock.getUserNameFromToken.mockClear().mockReturnValue('')
    const updateTodoStatusSpy = jest.spyOn<any, any>(service, 'updateTodoStatus');
    const updatedTodoDescriptionSpy = jest.spyOn<any, any>(service, 'updatedTodoDescription');

    service.runPatchAction('someToken', 'todo2', {op: 'update_status', value: 'completed'}).then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(updateTodoStatusSpy).toHaveBeenCalled();
      expect(response).toEqual({
        id: 'todo2',
        description: 'some todo 2',
        status: 'completed'
      });
    });

    service.runPatchAction('someToken', 'todo2', {op: 'update_description', value: 'updated description'}).then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(updatedTodoDescriptionSpy).toHaveBeenCalled();
      expect(response).toEqual({
        id: 'todo2',
        description: 'updated description',
        status: 'active'
      });
    });
  });
  
  test('should delete todo', () => {
    console.log(db[0].todos);
    
    service.deleteTodo('someToken', 'todo2').then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({deleted: 'todo2'});
     
      console.log(db[0].todos);
      console.log('here');
    });
  });
});
