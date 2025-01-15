import { Component, inject, input, OnInit, Signal } from '@angular/core';
import { TaskService } from '../_services/task.service';
import { Task } from '../_models/task';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',
})
export class TaskDetailComponent implements OnInit {
  private taskService = inject(TaskService);
  task: Task = {} as Task;
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.loadTask();
    var taskId = +this.route.snapshot.paramMap.get('id')!;

    console.log(taskId);
  }
  loadTask() {
    var taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.singleTask(taskId).subscribe({
      next: (task) => (this.task = task),
    });
  }

  markComplete() {
    var taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.markComplete(taskId).subscribe({
      next: () => {
        if (!this.task.isCompleted) {
          this.task.isCompleted = true;
        }
      },
    });
  }
}
