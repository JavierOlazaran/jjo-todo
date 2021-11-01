import { CreateTodoResponseDTO, DeleteCompletedResponseDTO, DeleteTodoResponseDTO, TodosResponseDTO, UpdateTodoResponseDTO } from '../models/todos.model';
import { TodoItem } from './../../pages/todo-list-page/components/todo-item/todo-item.component';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly todosUrl = `${environment.envConstants.apiBaseUrl}${environment.envConstants.todosEndpoint}`;

  constructor(
    private http: HttpClient
  ) { }

  getTodos(): Observable<TodosResponseDTO> {
    return this.http.get<TodosResponseDTO>(this.todosUrl);
  }

  deleteTodo(itemId: string): Observable<DeleteTodoResponseDTO> {
    return this.http.delete<DeleteTodoResponseDTO>(`${this.todosUrl}/${itemId}`);
  }

  createTodo(newItem: TodoItem): Observable<CreateTodoResponseDTO> {
    return this.http.post<CreateTodoResponseDTO>(this.todosUrl, newItem);
  }

  updateTodoStatus(item: TodoItem): Observable<UpdateTodoResponseDTO> {
    return this.http.patch<UpdateTodoResponseDTO>(`${this.todosUrl}/${item.id}`, {op: "update_status", value: item.status});
  }

  deleteCompletedTodos(): Observable<DeleteCompletedResponseDTO>{
    return this.http.delete<DeleteCompletedResponseDTO>(`${this.todosUrl}/delete/completed`);
  }
}
