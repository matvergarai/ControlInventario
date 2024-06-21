import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';
  private token: string | null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  register(username: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { username, password, role });
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password })
      .pipe(tap((response: any) => {
        this.token = response.token;
        localStorage.setItem('token', this.token!);
      }));
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }
}
