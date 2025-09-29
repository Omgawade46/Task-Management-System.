import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from '../models/task.model';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';// Backend URL

  constructor(private http: HttpClient, private auth: AuthService) {}

// Function to get auth headers with token
  private getAuthHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.auth.getToken()}`
      })
    };
  }
// Function to get all tasks
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl, this.getAuthHeaders());
  }
//  Function to add a new task
  addTask(task: Task) {
    return this.http.post(this.apiUrl, task, this.getAuthHeaders());
  }

// Function to update a task
  updateTask(task: Task) {
    return this.http.put(`${this.apiUrl}/${task.taskId}`, task, this.getAuthHeaders());
  }
// Function to delete a task
  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
