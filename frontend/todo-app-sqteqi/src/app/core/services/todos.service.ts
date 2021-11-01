import { DeletedTodo, TodosResponseDTO } from '../models/todos.model';
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

  deleteTodo(itemId: string): Observable<DeletedTodo> {
    return this.http.delete<DeletedTodo>(`${this.todosUrl}/${itemId}`);
  }

  createTodo(newItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.todosUrl, newItem);
  }

  updateTodoStatus(item: TodoItem): Observable<TodoItem> {
    return this.http.patch<TodoItem>(`${this.todosUrl}/${item.id}`, {op: "update_status", value: item.status});
  }

  deleteCompletedTodos(): Observable<TodoItem[]>{
    return this.http.delete<TodoItem[]>(`${this.todosUrl}/delete/completed`);
  }
}
