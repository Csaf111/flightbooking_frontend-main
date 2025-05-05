import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      this.loggedIn.next(!!token);
    }
  }

  get user(): any {
    if (typeof window === 'undefined') return null;
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }

  setLoggedIn(status: boolean): void {
    this.loggedIn.next(status);
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.setLoggedIn(false);
  }

  login(user: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{ token: string; user: any }>('http://127.0.0.1:5001/login', user, { headers })
      .pipe(
        tap(response => {
          if (typeof window !== 'undefined') {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
          }
          this.setLoggedIn(true);
        })
      );
  }
}
