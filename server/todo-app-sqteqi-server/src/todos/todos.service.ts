import { TodoItem } from './models/todos.classes';
import { CreateTodoRequestDTO, CreateTodoResponseDTO, DeleteTodoResponseDTO, GetAllTodosResponseDTO, GetTodoDTO, TodoPatchActionDTO, TodoPatchResponseDTO, UpdateTodoRequestDTO, UpdateTodoResponseDTO } from './models/todos.dto';
import { AuthService } from '../auth/auth.service';
import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { DataService } from '../data/mock.db.service';
@Injectable()
export class TodosService {
    private patchActionsMap = new Map([
        ['update_status', this.updateStatusStrategy],
        ['update_description', this.updatedDescriptionStrategy],
    ]);

    constructor(
        private authSvc: AuthService,
        private dataSvc: DataService
        ) {}

    async getAllTodos(jwtToken: string):Promise<GetAllTodosResponseDTO> {
        const userName = await this.authSvc.getUserNameFromToken(jwtToken);
        
        const todos = this.getUserTodos(userName);
        return {todos: todos};
    }

    async getTodoById(todoId: string ,jwtToken: string): Promise<GetTodoDTO> {
        const userName = this.authSvc.getUserNameFromToken(jwtToken);
        const todos = this.getUserTodos(userName);
        const todo = todos.find(todo => todo.id === todoId);

        return {todo: todo};
    }

    async createTodo(jwtToken: string, body: CreateTodoRequestDTO): Promise<CreateTodoResponseDTO> {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const todoId = uuid();
        const newTodo = {
            id: todoId,
            ...body
        };
        this.dataSvc.db.find(_user => _user.username === user).todos.push(newTodo);

        return {todo: newTodo.id};
    }

    async replaceTodo(jwtToken: string, todoId: string, payload: UpdateTodoRequestDTO): Promise<UpdateTodoResponseDTO> {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const itemIndex = this.dataSvc.db.find(_user => _user.username === user).todos.findIndex(item => item.id === todoId);

        this.dataSvc.db.find(_user => _user.username === user).todos
        .splice(
            itemIndex,
            1,
            {id: todoId, ...payload}
        );
        const todo = this.dataSvc.db.find(_user => _user.username === user).todos.find(item => item.id === todoId);
        return { todo: todo };
    }

    async runPatchAction(jwtToken: string, todoId: string, action: any): Promise<TodoPatchResponseDTO> {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);

        if (!this.patchActionsMap.has(action.op)) throw new HttpException('Invalid action', 400);

        const patchedTodo = await this.patchActionsMap.get(action.op)(this.dataSvc, user, todoId, action.value);
        return { todo: patchedTodo };
    }

    async deleteTodo(jwtToken: string, todoId): Promise<DeleteTodoResponseDTO> {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const itemIndex = this.dataSvc.db.find(_user => _user.username === user).todos.findIndex(item => item.id === todoId);
        this.dataSvc.db.find(_user => _user.username === user).todos
        .splice(itemIndex, 1);
        return {deleted: todoId};
    }

    async deleteCompleted(jwtToken) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const userTodos: any[] = this.dataSvc.db.find(_user => _user.username === user).todos;

        this.dataSvc.db.find(_user => _user.username === user).todos = userTodos.filter(item => item.status === 'active');

        return this.dataSvc.db.find(_user => _user.username === user).todos;
    }

    private async updateStatusStrategy(dataSvc: DataService, user: string, todoId: string, value: string) {
        const userTodos: any[] = dataSvc.db.find(_user => _user.username === user).todos;
        dataSvc.db.find(_user => _user.username === user).todos = userTodos.map(item => {
            if (item.id === todoId) {
                return {id: item.id, description: item.description, status: value}
            } else {
                return item;
            }
        })
        return dataSvc.db.find(_user => _user.username === user).todos.find(item => item.id === todoId);
    }

    private async updatedDescriptionStrategy(dataSvc: DataService, user: string, todoId: string, value: string) {
        const itemIndex = dataSvc.db.find(_user => _user.username === user).todos.findIndex(item => item.id === todoId);
        const item = dataSvc.db.find(_user => _user.username === user).todos.find(item => item.id === todoId);
        dataSvc.db.find(_user => _user.username === user).todos
        .splice(
            itemIndex,
            1,
            {...item, description: value}
        );
        return dataSvc.db.find(_user => _user.username === user).todos.find(item => item.id === todoId);
    }

    private getUserTodos(userName: any): TodoItem[] {
        return this.dataSvc.db.find(item => { return item.username === userName; }).todos;
    }

}
