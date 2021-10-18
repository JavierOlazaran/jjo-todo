import { TodoItemObject } from "./todos/models/todos.dto";

export interface MockedDBSchema {
    userName: string;
    password: string;
    todos: TodoItemObject[],
}

export const db: MockedDBSchema[] = [
  {
    userName: 'user1',
    password: '12345',
    todos: [
      {
        id: 'todo1',
        description: 'some todo',
        status: 'active'
      }
    ],
  },
  {
    userName: 'user1',
    password: '12345',
    todos: []
  },
  {
    userName: 'user1',
    password: '12345',
    todos: [],
  },
];
