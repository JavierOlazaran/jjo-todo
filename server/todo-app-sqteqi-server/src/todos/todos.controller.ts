import {
	CreateTodoRequestDTO,
	CreateTodoResponseDTO,
	DeleteCompletedTodosResponseDTO,
	DeleteTodoResponseDTO,
	GetAllTodosResponseDTO,
	GetTodoDTO,
	TodoPatchActionDTO,
	TodoPatchResponseDTO,
	UpdateTodoRequestDTO,
	UpdateTodoResponseDTO,
} from "./models/todos.dto";
import { TodosService } from "./todos.service";
import { JwtAuthGuard } from "./../auth/guards/jwt-auth.guard";
import {
	Body,
	Controller,
	Delete,
	Get,
	Headers,
	Param,
	Patch,
	Post,
	Put,
	UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Todos')
@Controller("v1/todos")
export class TodosController {
	constructor(private todosSvc: TodosService) {}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getAllTodos(
		@Headers("authorization") authorization: string
	): Promise<GetAllTodosResponseDTO> {
		return await this.todosSvc.getAllTodos(authorization);
	}

	@UseGuards(JwtAuthGuard)
	@Get(":todoId")
	async getTodoById(
		@Param("todoId") todoId: string,
		@Headers("authorization") authorization: string
	): Promise<GetTodoDTO> {
		return await this.todosSvc.getTodoById(todoId, authorization);
	}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createTodo(
		@Headers("authorization") authorization: string,
		@Body() body: CreateTodoRequestDTO

	): Promise<CreateTodoResponseDTO> {
		return await this.todosSvc.createTodo(authorization, body);
	}

	@UseGuards(JwtAuthGuard)
	@Put(":todoId")
	async updateTodo(
		@Headers("authorization") authorization: string,
		@Param("todoId") todoId: string,
		@Body() body: UpdateTodoRequestDTO

	): Promise<UpdateTodoResponseDTO> {
		return await this.todosSvc.replaceTodo(authorization, todoId, body);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":todoId")
	async patchTodo(
		@Headers("authorization") authorization: string,
		@Param("todoId") todoId: string,
		@Body() body: TodoPatchActionDTO
	): Promise<TodoPatchResponseDTO> {
		return await this.todosSvc.runPatchAction(authorization, todoId, body);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":todoId")
	async deleteTodo(
		@Headers("authorization") authorization: string,
		@Param("todoId") todoId: string
	): Promise<DeleteTodoResponseDTO> {
		return await this.todosSvc.deleteTodo(authorization, todoId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("/delete/completed")
	async deleteCompletedTodos(
		@Headers("authorization") authorization: string
	): Promise<DeleteCompletedTodosResponseDTO> {
		return await this.todosSvc.deleteCompleted(authorization);
	}
}
