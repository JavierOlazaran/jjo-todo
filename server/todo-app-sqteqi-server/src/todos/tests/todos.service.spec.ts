import { DataService } from '../../data/mock.db.service';
import { AuthService } from './../../auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from '../todos.service';

describe('TodosService', () => {
  let service: TodosService;
  const dataSvcMock= {
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
        { provide: AuthService, useValue: authServiceMock },
        { provide: DataService, useValue: dataSvcMock },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should getAllTodos', async () => {
    await service.getAllTodos('someToken').then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({todos: userTodosMock});
    });
  });

  test('should get todoById', async () => {
    await service.getTodoById('todo2', 'someToken').then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({
        todo: {
          id: 'todo2',
          description: 'some todo 2',
          status: 'active'
        }}
      );
    });
  });

  test('should create todo', async () => {
    await service.createTodo('someToken', {description: 'this is a new todo', status: 'active'}).then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
    });
  });

  test('should replace todo', async () => {
    await service.replaceTodo('someToken', 'todo2', {description: 'updated description', status: 'active'}).then(response => {

      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({
        id: 'todo2',
        description: 'updated description',
        status: 'active'
      });
    });
  });

  test('should patch action', async () => {
    authServiceMock.getUserNameFromToken.mockClear().mockReturnValue('user1')

    await service.runPatchAction('someToken', 'todo4', {op: 'update_status', value: 'completed'}).then(response => {
      expect(response).toEqual({
        id: 'todo4',
        description: 'some todo 4',
        status: 'completed'
      });
    });

    await service.runPatchAction('someToken', 'todo3', {op: 'update_description', value: 'updated description'}).then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({
        id: 'todo3',
        description: 'updated description',
        status: 'completed'
      });
    });
  });
  
  test('should delete todo', () => {
    service.deleteTodo('someToken', 'todo2').then(response => {
      expect(authServiceMock.getUserNameFromToken).toHaveBeenCalledWith('someToken');
      expect(response).toEqual({deleted: 'todo2'});
    });
  });
});
