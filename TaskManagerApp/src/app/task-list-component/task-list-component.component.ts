import { Component, inject, OnInit, signal } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task';
import { RouterModule } from '@angular/router';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { map } from 'rxjs';

@Component({
  selector: 'app-task-list-component',
  standalone: true,
  imports: [RouterModule, TooltipModule],
  templateUrl: './task-list-component.component.html',
  styleUrl: './task-list-component.component.css',
})
export class TaskListComponentComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = signal<Task[]>([]);

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.loadTasks().subscribe({
      next: (tasks) => this.tasks.set(tasks),
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.tasks.update((task) => {
          return task.filter((t) => t.id !== taskId);
        });
      },
    });
  }

  markComplete(id: number) {
    this.taskService.markComplete(id).subscribe({
      next: (task) => {
        this.tasks.update((task: Task[]) => {
          return task.map((t) => {
            if (!t.isCompleted && t.id === id) {
              t.isCompleted = true;
            }
            return t;
          });
        });
      },
    });
  }
}
