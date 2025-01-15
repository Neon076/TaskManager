import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Task } from '../_models/task';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private http = inject(HttpClient);
  tasks = signal<Task[] | null>([]);
  private apiUrl =environment.apiUrl;
  taskStatus = signal<Task | null>(null);

  createTask(model: any) {
    console.log('In task service');

    return this.http.post(`${this.apiUrl}task`, model);
  }
  loadTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}task/all`);
  }

  singleTask(id: number) {
    return this.http.get<Task>(`${this.apiUrl}task/${id}`);
  }

  updateTask(task: Task) {
    return this.http.put<Task>(`${this.apiUrl}task/edit/${task.id}`, task);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}task/delete/${id}`);
  }

  markComplete(taskId: number) {
    console.log(taskId);
    
    return this.http.put(`${this.apiUrl}task/markcomplete/${taskId}`, {})
  }
}
