import { TodoItem } from './../../pages/todo-list-page/components/todo-item/todo-item.component';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  getTodos(): Observable<any> {
    return this.http.get(this.todosUrl);
  }

  deleteTodo(itemId: string): Observable<any> {
    return this.http.delete(`${this.todosUrl}/${itemId}`);
  }

  createTodo(newItem: any): Observable<any> {
    return this.http.post(this.todosUrl, newItem);
  }

  updateTodoStatus(item: TodoItem): Observable<any> {
    return this.http.patch(`${this.todosUrl}/${item.id}`, {op: "update_status", value: item.status});
  }

  deleteCompletedTodos(): Observable<any>{
    return this.http.delete(`${this.todosUrl}/delete/completed`);
  }
}
