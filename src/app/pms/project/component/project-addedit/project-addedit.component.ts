import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from 'src/app/company/service/company.service';
import { ProjectService } from '../../service/project.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project } from '../../model/project';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-addedit',
  templateUrl: './project-addedit.component.html',
  styleUrls: ['./project-addedit.component.css']
})
export class ProjectAddeditComponent {
  isEditMode = false;
  projectForm: FormGroup;
  projectStatusList = ["IN_PROGRESS", "COMPLETE", "ON_HOLD", "CANCELLED"];
  selectedCompanyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectAddeditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Project
  ) {
    this.isEditMode = !!data;
    this.projectForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      projectBudget: ['', Validators.required],
      projectStatus: ['', Validators.required],
      projectStartDate: ['', Validators.required],
      projectEndDate: ['', Validators.required],
      projectLocation: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      this.selectedCompanyId = id;
    });

    if (this.data) {
      this.projectForm.patchValue(this.data);
    }
  }

  // onSubmit(): void {
  //   if (this.projectForm.valid && this.selectedCompanyId !== null) {
  //     const project: Project = this.projectForm.value;

  //     const saveOrUpdate: Observable<Project> = this.isEditMode
  //       ? this.projectService.updateProject(this.selectedCompanyId, project.id, project)
  //       : this.projectService.createProject(this.selectedCompanyId, project);

  //     saveOrUpdate.subscribe(
  //       () => {
  //         this.snackBar.open(this.isEditMode ? 'Project Updated Successfully' : 'New Project Added', 'Close', { duration: 4000 });
  //         this.dialogRef.close(true);
  //       },
  //       error => {
  //         this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
  //       }
  //     );
  //   }
  // }


  onSubmit(): void {
    if (this.projectForm.valid && this.selectedCompanyId !== null) {
      const project: Project = this.projectForm.value;

      const saveOrUpdate: Observable<Project> = this.isEditMode
        ? this.projectService.updateProject(this.selectedCompanyId, project.id, project)
        : this.projectService.createProject(this.selectedCompanyId, project);

      saveOrUpdate.subscribe(
        () => {
          this.snackBar.open(this.isEditMode ? 'Project Updated Successfully' : 'New Project Added', 'Close', { duration: 4000 });
          this.dialogRef.close(true);
        },
        error => {
          this.snackBar.open(`Error: ${error}`, 'Close', { duration: 6000 });
        }
      );
    } else {
      this.snackBar.open('Form is invalid or company ID is not selected.', 'Close', { duration: 4000 });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.projectForm.get(controlName);
    if (control?.hasError('required')) {
      return 'This field is required';
    }
    return '';
  }
}
