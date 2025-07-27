import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(!!localStorage.getItem('user'));

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('https://bb212102-2fab-4fae-9227-3b2b24cf1275.mock.pstmn.io/auth/api/log in/', {
      email, password
    }).pipe(
      tap(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.isAuthenticated.next(true);
      }),
      catchError(err => throwError(() => new Error('Login Failed')))
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated.value;
  }

  authChanges(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }
}
