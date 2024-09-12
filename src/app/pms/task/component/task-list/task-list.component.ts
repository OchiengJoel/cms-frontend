import { Component, OnInit, ViewChild } from '@angular/core';
import { Task } from '../../model/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/company/service/company.service';
import { ProjectService } from 'src/app/pms/project/service/project.service';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title: string;
  selectedCompanyId: number | null = null;
  displayedColumns: string[] = ["select","name","description","projectBudget","projectLocation","projectStartDate","projectEndDate","projectStatus", "action"];
  dataSource: MatTableDataSource<Task> = new MatTableDataSource<Task>([]);
  selection: Set<Task> = new Set<Task>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(

    private companyService: CompanyService,
    private projectService: ProjectService,
    private taskService: TaskService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar

  ){

    this.title="Tasks Listing"
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }


  

}
