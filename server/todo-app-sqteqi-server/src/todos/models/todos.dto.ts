export class TodoItemObject {
    id: string;
    description: string;
    status: string;
}

export class CreateTodoRequestDTO {
    description: string;
    status: string;
}

export class GetAllTodosResponseDTO {
    todos: TodoItemObject [];
}
