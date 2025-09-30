import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule , CommonModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {

  today: string = new Date().toISOString().split('T')[0]; // "YYYY-MM-DD"

@Input() task: Task = { title: '', description: '', dueDate: '  {today} ', priority: 'Low', status: 'Pending' };
  @Output() save = new EventEmitter<Task>();

  // Function to handle form submission
  onSubmit() {
    this.save.emit(this.task);
    this.task = { title: '', description: '', dueDate: '{ today } ', priority: 'Low', status: 'Pending' };
  }
}
