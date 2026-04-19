import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthBEResponse } from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly URL = `http://localhost:3000`;

  login(username: string, password: string) {
    return this.http.post<AuthBEResponse>(`${this.URL}/login`, { username, password });
  }

  register(username: string, password: string) {
    return this.http.post<AuthBEResponse>(`${this.URL}/register`, { username, password });
  }
}
