import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users/login';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap((response) => {
        console.log('Response from server:', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loggedInSubject.next(true);
        }
      }),
      catchError(this.handleError('login'))
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedInSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedInSubject.next(false);
  }

  private handleError(operation = 'operation', result?: any) {
    return (error: any): Observable<any> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as any);
    };
  }
}
