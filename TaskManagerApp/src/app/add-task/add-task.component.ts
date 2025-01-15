import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { TaskService } from '../_services/task.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent implements OnInit {
  private taskService = inject(TaskService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  TaskForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.TaskForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addTask() {
    console.log('Add Task', this.TaskForm.value);

    this.taskService.createTask(this.TaskForm.value).subscribe({
      next: ()=>{
        this.router.navigateByUrl('')
      },
      error:err => console.log(err)
      
    });
  }

  cancel(){
    this.router.navigateByUrl('');
  }
  get taskFormControl(){
    return this.TaskForm.controls
  }
}
