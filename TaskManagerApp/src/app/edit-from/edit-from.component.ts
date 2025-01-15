import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../_models/task';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../_services/task.service';
@Component({
  selector: 'app-edit-from',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-from.component.html',
  styleUrl: './edit-from.component.css',
})
export class TaskForm implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);
  private router= inject(Router)
  task?: Task;
  ngOnInit(): void {
    this.loadTask();
  }
  loadTask() {
    var taskId = +this.route.snapshot.paramMap.get('id')!;
    this.taskService.singleTask(taskId).subscribe({
      next: (task) => (this.task = task),
    });
  }

  updateTask() {
    if (this.task) {
      this.taskService.updateTask(this.task).subscribe({
        next: (updatedTask) => {
          this.task = updatedTask;
          this.router.navigateByUrl('')
        },
      });
    }
  }
  cancel(){
    this.router.navigateByUrl('');
  }
}
