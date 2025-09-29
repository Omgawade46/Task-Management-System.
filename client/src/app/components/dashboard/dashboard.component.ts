import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TaskFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  selectedTask: Task = { title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' };

  constructor(private taskService: TaskService, private auth: AuthService) {}

  ngOnInit() {
    this.loadTasks();
     
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(res => {
      // console.log('Tasks from API:', res); // 👀 debug
      this.tasks = res;

    });
  }

  addOrUpdateTask(task: Task) {
    if (task.taskId) {
      this.taskService.updateTask(task).subscribe(() => this.loadTasks());
    } else {
      this.taskService.addTask(task).subscribe(() => this.loadTasks());
    }
    this.selectedTask = { title: '', description: '', dueDate: '', priority: 'Low', status: 'Pending' };
  }

  editTask(task: Task) {
    this.selectedTask = { ...task };
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }

  logout() {
    this.auth.logout();
  }






}
