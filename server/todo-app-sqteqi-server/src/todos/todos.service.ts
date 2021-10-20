import { CreateTodoRequestDTO } from './models/todos.dto';
import { db } from './../mock.db';
import { AuthService } from 'src/auth/auth.service';
import { Injectable, HttpException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TodosService {
    private patchActionsMap = new Map([
        ['update_status', this.updateTodoStatus],
        ['update_description', this.updatedTodoDescription],
    ]);

    constructor(
        private authSvc: AuthService
        ) {}

    async getAllTodos(jwtToken: string) {
        const userName = await this.authSvc.getUserNameFromToken(jwtToken);
        const todos = db.find(item => {return item.userName === userName}).todos;
        return todos;
    }

    async getTodoById(todoId: string ,jwtToken: string) {
        const todos = await this.getAllTodos(jwtToken);
        const todo = todos.find(todo => todo.id === todoId);

        return todo;
    }

    async createTodo(jwtToken: string, body: CreateTodoRequestDTO) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const todoId = uuid();
        const newTodo = {
            id: todoId,
            ...body
        };
        db.find(_user => _user.userName === user).todos.push(newTodo);

        return newTodo;
    }

    async replaceTodo(jwtToken: string, todoId: string, payload: any) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const itemIndex = db.find(_user => _user.userName === user).todos.findIndex(item => item.id === todoId);

        db.find(_user => _user.userName === user).todos
        .splice(
            itemIndex,
            1,
            {id: todoId, ...payload}
        );

        return db.find(_user => _user.userName === user).todos.find(item => item.id === todoId);
    }

    async runPatchAction(jwtToken: string, todoId: string, action: any) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        if (!this.patchActionsMap.has(action.op)) throw new HttpException('Invalid action', 400);
        return await this.patchActionsMap.get(action.op)(user, todoId, action.value);
    }

    async deleteTodo(jwtToken: string, todoId) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const itemIndex = db.find(_user => _user.userName === user).todos.findIndex(item => item.id === todoId);
        db.find(_user => _user.userName === user).todos
        .splice(itemIndex, 1);
        return {deleted: todoId};
    }

    async deleteCompleted(jwtToken) {
        const user = await this.authSvc.getUserNameFromToken(jwtToken);
        const userTodos: any[] = db.find(_user => _user.userName === user).todos;
        
        db.find(_user => _user.userName === user).todos = userTodos.filter(item => item.status === 'active');

        return db.find(_user => _user.userName === user).todos;
    }

    private async updateTodoStatus(user: string, todoId: string, value: string) {
        const userTodos: any[] = db.find(_user => _user.userName === user).todos;
        db.find(_user => _user.userName === user).todos = userTodos.map(item => {
            if (item.id === todoId) {
                return {id: item.id, description: item.description, status: value}
            } else {
                return item;
            }
        })
        return db.find(_user => _user.userName === user).todos.find(item => item.id === todoId);
    }

    private async updatedTodoDescription(user: string, todoId: string, value: string) {
        const itemIndex = db.find(_user => _user.userName === user).todos.findIndex(item => item.id === todoId);
        const item = db.find(_user => _user.userName === user).todos.find(item => item.id === todoId);
        db.find(_user => _user.userName === user).todos
        .splice(
            itemIndex,
            1,
            {description: value, ...item}
        );
        return db.find(_user => _user.userName === user).todos.find(item => item.id === todoId);
    }
}
