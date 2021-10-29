import { TodoItem } from "src/todos/models/todos.classes";

export class User {
    username: string;
    password: string;
    todos: TodoItem[]
}
export class UserCredentials {
    userName: string;
    password: string;
}
