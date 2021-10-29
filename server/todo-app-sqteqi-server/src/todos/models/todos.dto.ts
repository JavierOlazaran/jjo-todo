import { IsNotEmpty, IsString } from "class-validator";
import { TodoItem } from "./todos.classes";

export class GetAllTodosResponseDTO {
    todos: TodoItem [];
}
export class CreateTodoRequestDTO {
    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    status: string;
}

