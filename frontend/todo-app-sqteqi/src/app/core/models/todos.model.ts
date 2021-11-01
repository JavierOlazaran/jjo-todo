import { TodoItem } from './../../pages/todo-list-page/components/todo-item/todo-item.component';

export interface DeletedTodo {
  deleted: string
}

export interface TodosResponseDTO {
  todos: TodoItem[];
}

export interface DeleteTodoResponseDTO {
  deleted: string;
}

export interface CreateTodoResponseDTO {
  todo: string;
}

export interface UpdateTodoResponseDTO {
  todo: TodoItem;
}

export interface DeleteCompletedResponseDTO {
  todos: TodoItem[];
}
