import { TodoItemObject } from "./todos/models/todos.dto";

export interface MockedDBSchema {
    userName: string;
    password: string;
    todos: TodoItemObject[],
}

export const db = [
  {
    userName: 'user1',
    password: '12345',
    todos: [],
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
