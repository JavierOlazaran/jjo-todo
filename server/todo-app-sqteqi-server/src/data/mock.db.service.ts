import { Injectable } from "@nestjs/common";
import { TodoItemObject } from "../todos/models/todos.dto";

export interface MockedDBSchema {
    username: string;
    password: string;
    todos: TodoItemObject[],
}

@Injectable()
export class DataService {
  
  db: MockedDBSchema[] = [
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
        },
      ],
    },
    {
      username: 'user2',
      password: '123456',
      todos: []
    },
    {
      username: 'user3',
      password: '12345678',
      todos: [],
    },
  ];
}