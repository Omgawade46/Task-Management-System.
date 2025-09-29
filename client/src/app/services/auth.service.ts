import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth'; // Backend URL

  constructor(private http: HttpClient, private router: Router) {}

  // Function to handle login
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, { email, password });
  }

  // Function to handle registration
  register(name: string, email: string, password: string) {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password });
  }
// Function to save token in local storage
  saveToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  // Function to get token from local storage
  getToken() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  // Function to handle logout
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
// Function to check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }


}
