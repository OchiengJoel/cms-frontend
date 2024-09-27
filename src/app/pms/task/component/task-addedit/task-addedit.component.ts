import { Component, Inject } from '@angular/core';
import { Task } from '../../model/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { ProjectService } from 'src/app/pms/project/service/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskListComponent } from '../task-list/task-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company/service/company.service';

@Component({
  selector: 'app-task-addedit',
  templateUrl: './task-addedit.component.html',
  styleUrls: ['./task-addedit.component.css']
})
export class TaskAddeditComponent {

}