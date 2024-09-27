import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/company/service/company.service';
import { ProjectService } from '../../service/project.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../model/project';
import { ProjectAddeditComponent } from '../project-addedit/project-addedit.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit{ 

  //dataSource2: MatTableDataSource<ProjectDTO> = new MatTableDataSource<ProjectDTO>([]);
  //displayedColumns2: string[] = ["id","name","projectStatus", "action"];
  title: string;
  selectedCompanyId: number | null = null;
  displayedColumns: string[] = ["select","name","description","projectBudget","projectLocation","projectStartDate","projectEndDate","projectStatus", "action"];
  dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  selection: Set<Project> = new Set<Project>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  startDate!: Date;
  endDate!: Date 
  isLoading: boolean = false;
  projects: Project[] = [];

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ){
    this.title = `Projects List`
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.fetchProjects();
        //this.loadProjects();
      }
    });
  }

  fetchProjects(): void {
    this.isLoading = true;
    if (this.selectedCompanyId !== null) {
      this.projectService.getAllProjects(this.selectedCompanyId).subscribe(projects => {
        this.dataSource.data = projects;
        this.isLoading = false;
      }, error => {
        this.snackBar.open(`Error fetching projects: ${error}`, 'Close', { duration: 6000 });
        this.isLoading = false;
      });
    }
  }

  // loadProjects(): void {
  //   //const companyId = 1; // Replace with actual company ID
  //   if (this.selectedCompanyId !== null) {
  //   this.projectService.getProjectsWithTasksByCompanyId(this.selectedCompanyId).subscribe((projects: ProjectDTO[]) => {
  //     this.dataSource2.data = projects;
  //       this.isLoading = false;
  //     }, error => {
  //       this.snackBar.open(`Error fetching projects: ${error}`, 'Close', { duration: 6000 });
  //       this.isLoading = false;
  //     });
  //   }
  // }


  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  filterByDateRange(): void {
    if (this.startDate && this.endDate) {
      this.dataSource.data = this.dataSource.data.filter(project => {
        const projectStartDate = new Date(project.projectStartDate);
        const projectEndDate = new Date(project.projectEndDate);
        return projectStartDate >= this.startDate && projectEndDate <= this.endDate;
      });
    }
  }

  openFormDialog(project?: Project): void {
    const dialogRef = this.dialog.open(ProjectAddeditComponent, {
      width: window.innerWidth < 600 ? '100%' : '800px',
      data: project
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchProjects();
      }
    });
  }

  deleteProject(projectId:number): void {
    if (this.selectedCompanyId !== null && window.confirm('Confirm You Intend To Delete Highlighted Project')) {

      this.projectService.deleteProject(this.selectedCompanyId, projectId).subscribe(() => {
        this.snackBar.open('Project Deleted Successfully', 'Close', {
          duration:4000
        });
        this.fetchProjects();
      }, error => {
        this.snackBar.open('Error Performing This Operation: ${error}', 'Close', {
          duration:4000
        })
      }
    )      
    }
  }

  deleteSelectedProjects() {
    throw new Error('Method not implemented.');
  } 

  toggleAll(event: any): void {
    if (event.checked) {
      this.dataSource.data.forEach(project => this.selection.add(project));
    } else {
      this.selection.clear();
    }
  }

  toggleSelection(project: Project): void {
    if (this.selection.has(project)) {
      this.selection.delete(project);
    } else {
      this.selection.add(project);
    }
  }

  isAllSelected(): boolean {
    return this.selection.size === this.dataSource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selection.size > 0 && this.selection.size < this.dataSource.data.length;
  }

  hasSelectedProjects(): boolean {
    return this.selection.size > 0;
  }

}
