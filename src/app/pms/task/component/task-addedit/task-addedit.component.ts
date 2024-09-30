import { Component, Inject, OnInit } from '@angular/core';
import { Task, TaskStatus } from '../../model/task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { ProjectService } from 'src/app/pms/project/service/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskListComponent } from '../task-list/task-list.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from 'src/app/company/service/company.service';
import { Project } from 'src/app/pms/project/model/project';

@Component({
  selector: 'app-task-addedit',
  templateUrl: './task-addedit.component.html',
  styleUrls: ['./task-addedit.component.css']
})

export class TaskAddeditComponent implements OnInit {
  isEditMode: boolean = false;
  taskForm: FormGroup;
  taskStatusList = Object.values(TaskStatus);
  projectList: { id: number; name: string }[] = [];
  selectedCompanyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskAddeditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.isEditMode = !!data;
    this.taskForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: [TaskStatus.TODO, Validators.required],
      projectId: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      this.selectedCompanyId = id;
      this.loadProjects();
    });

    if (this.isEditMode) {
      this.taskForm.patchValue(this.data);
    }
  }

  loadProjects(): void {
    if (this.selectedCompanyId) {
      this.projectService.getAllProjects(this.selectedCompanyId).subscribe(
        projects => {
          this.projectList = projects.map(project => ({
            id: project.id,
            name: project.name
          }));
        },
        error => {
          this.snackBar.open(`Error fetching projects: ${error}`, 'Close', { duration: 6000 });
        }
      );
    }
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = this.taskForm.value;
      const projectId = task.projectId;
      const taskId = task.id;

      const saveOrUpdate = this.isEditMode && taskId
        ? this.taskService.updateTask(projectId, taskId, task)
        : this.taskService.createTask(projectId, task);

      saveOrUpdate.subscribe(
        () => {
          this.snackBar.open(this.isEditMode ? 'Task Updated Successfully' : 'New Task Added', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        },
        error => {
          console.error('Error occurred:', error);
          this.snackBar.open(`Error: ${error.message || error}`, 'Close', { duration: 6000 });
        }
      );
    } else {
      this.snackBar.open('Form is invalid.', 'Close', { duration: 4000 });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.taskForm.get(controlName);
    return control?.hasError('required') ? 'This field is required' : '';
  }
}

// export class TaskAddeditComponent implements OnInit {
//   taskForm!: FormGroup;
//   taskStatusList = Object.values(TaskStatus);
//   isEditMode = false;
//   projectList: Project[] = [];
//   selectedCompanyId: number | null = null;
//   projectId: number | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private companyService: CompanyService,
//     private projectService: ProjectService,
//     private taskService: TaskService,
//     private snackBar: MatSnackBar,
//     public dialogRef: MatDialogRef<TaskAddeditComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { task: Task; projectId: number }
//   ) {
//     this.isEditMode = !!data.task;
//   }

//   ngOnInit(): void {
//     console.log('Task Data:', this.data.task); // Check the task data
//     //this.initializeForm();
//     this.loadSelectedCompanyId();

//     this.taskForm = this.fb.group({
//       id: [''], // Add ID field
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       dueDate: ['', Validators.required],
//       status: [TaskStatus.TODO, Validators.required],
//       projectId: [null, Validators.required]
//     });

//     // if (this.data) {
//     //   this.taskForm.patchValue(this.data);
//     // }

//     if (this.data && this.isEditMode) {
//       this.taskForm.patchValue(this.data.task); // Correctly patch the task
//       console.log('Task ID:', this.data.task.id); // Check the Task ID
//   }
//   }

//   private loadSelectedCompanyId(): void {
//     this.companyService.getSelectedCompanyId().subscribe(id => {
//       this.selectedCompanyId = id;
//       this.loadProjects();
//     });
//   }

//   private loadProjects(): void {
//     if (this.selectedCompanyId) {
//       this.projectService.getAllProjects(this.selectedCompanyId).subscribe(
//         projects => {
//           this.projectList = projects; // Assign the loaded projects to projectList
//         },
//         () => this.showSnackbar('Failed to load projects')
//       );
//     }
//   }


//   private initializeForm(): void {
//     this.taskForm = this.fb.group({
//       id: [''], // Add ID field
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       dueDate: ['', Validators.required],
//       status: [TaskStatus.TODO, Validators.required],
//       projectId: [null, Validators.required]
//     });

//     if (this.isEditMode) {
//       this.taskForm.patchValue(this.data.task);
//       console.log('Task ID:', this.data.task.id); // Log the Task ID
//     } else if (this.data.projectId) {
//       this.taskForm.patchValue({ projectId: this.data.projectId });
//     }
//   }


//   onSubmit(): void {
//     if (this.taskForm.valid) {
//       const task: Task = this.taskForm.value;

//       if (!task.projectId) {
//         this.showSnackbar('Please select a project for the task.');
//         return;
//       }

//       const taskId = this.isEditMode ? this.data.task.id : null;
//       if (!taskId && this.isEditMode) {
//         this.showSnackbar('Task ID is missing. Cannot update the task.');
//         return;
//       }

//       const taskRequest = this.isEditMode
//         ? this.taskService.updateTask(this.projectId!, taskId!, task) // Ensure taskId is defined
//         : this.taskService.createTask(task.projectId, task);

//       taskRequest.subscribe(
//         () => {
//           this.showSnackbar(this.isEditMode ? 'Task Updated Successfully' : 'New Task Added Successfully');
//           this.dialogRef.close(true);
//         },
//         error => {
//           console.error('Error occurred while creating/updating task:', error);
//           this.showSnackbar(`Error: ${error}`);
//         }
//       );
//     } else {
//       this.showSnackbar('Form is invalid. Please fill all required fields.');
//     }
//   }

//   private showSnackbar(message: string): void {
//     this.snackBar.open(message, 'Close', { duration: 4000 });
//   }

//   onCancel(): void {
//     this.dialogRef.close();
//   }
// }