import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlingService {

  constructor(
    private router: Router
  ) { }

  gotoErrorPage() {
    this.router.navigate(['error']);
  }
}
