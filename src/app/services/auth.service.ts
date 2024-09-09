import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        console.log('Response from server:', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
        }
      }),
      catchError(this.handleError('login'))
    );
  }
  

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

 
  logout(): void {
    localStorage.removeItem('token');
  }

 private handleError(operation = 'operation', result?: any) {
  return (error: any): Observable<any> => {
    console.error(`${operation} failed: ${error.message}`);
    return of(result as any);
  };
}}

