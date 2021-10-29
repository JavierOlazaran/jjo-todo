import { TodoItem } from './../../pages/todo-list-page/components/todo-item/todo-item.component';
export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserRecord {
  username: string;
  password: string;
  todos: TodoItem[];
}


