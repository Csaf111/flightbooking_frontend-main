import { HttpClient, HttpHeaders } from '@angular/common/http'; // ✅ Fix 2: Import HttpClient and HttpHeaders
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'; // ✅ Fix 1: Import Observable

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(typeof window !== 'undefined' && !!localStorage.getItem('token'));
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {} // ✅ Fix 3: Inject HttpClient

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
    return this.http.post('http://127.0.0.1:5001/login', user, { headers });
  }
}
