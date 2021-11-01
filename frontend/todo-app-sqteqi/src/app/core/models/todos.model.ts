import { TodoItem } from './../../pages/todo-list-page/components/todo-item/todo-item.component';

export interface DeletedTodo {
  deleted: string
}

export interface TodosResponseDTO {
  todos: TodoItem[];
}
