import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

}
