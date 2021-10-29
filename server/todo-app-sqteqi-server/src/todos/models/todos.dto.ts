import { IsNotEmpty, IsString } from "class-validator";
import { TodoItem } from "./todos.classes";

export class GetAllTodosResponseDTO {
    todos: TodoItem [];
}

export class GetTodoDTO {
    todo: TodoItem;
}
export class CreateTodoRequestDTO {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}

export class CreateTodoResponseDTO {
    todo: string;
}
 
export class UpdateTodoRequestDTO {
    description: string;
    status: string;
}
export class UpdateTodoResponseDTO {
    todo: TodoItem;
}
export class TodoPatchActionDTO {
    @IsNotEmpty()
    @IsString()
    op: string;

    @IsNotEmpty()
    @IsString()
    value: string;
}

export class TodoPatchResponseDTO {
    todo: TodoItem;
}

export class DeleteTodoResponseDTO {
    deleted: string;
}
