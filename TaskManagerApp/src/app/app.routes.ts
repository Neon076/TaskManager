import { Routes } from '@angular/router';
import { TaskListComponentComponent } from './task-list-component/task-list-component.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskForm } from './edit-from/edit-from.component';
import { AddTaskComponent } from './add-task/add-task.component';

export const routes: Routes = [
    {path : '',component:TaskListComponentComponent},
    {path : 'task/:id',component:TaskDetailComponent},
    {path : 'edit-task/:id',component:TaskForm},
    {path : 'add-task',component:AddTaskComponent}
];