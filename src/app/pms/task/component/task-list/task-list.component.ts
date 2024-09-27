import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/company/service/company.service';
import { ProjectService } from 'src/app/pms/project/service/project.service';
import { TaskService } from '../../service/task.service';
import { forkJoin, map, Observable } from 'rxjs';
import { Project} from 'src/app/pms/project/model/project';
import { TaskAddeditComponent } from '../task-addedit/task-addedit.component';

// Define an interface for Task with Project Info
interface TaskWithProject {
  projectId: number;
  projectName: string;
  tasks: {
    taskName: string;
    description: string;
    dueDate: Date;
    taskStatus: string; // Adjust based on your enum type
  }[];
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  title: string;
  displayedColumns: string[] = ['taskName', 'description', 'dueDate', 'taskStatus', 'action'];
  dataSource: TaskWithProject[] = []; // Changed to store grouped data
  selectedCompanyId: number | null = null;

  constructor(
    private companyService: CompanyService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {

    this.title = `Task Management Module`
  }

  ngOnInit(): void {
    this.companyService.getSelectedCompanyId().subscribe(id => {
      if (id !== null) {
        this.selectedCompanyId = id;
        this.loadProjectsWithTasks();
      }
    });
  }

  loadProjectsWithTasks(): void {
    if (this.selectedCompanyId !== null) {
      this.projectService.getAllProjects(this.selectedCompanyId).subscribe(projects => {
        const projectsWithTasks: TaskWithProject[] = [];
        const projectRequests = projects.map(project => 
          this.taskService.getAllTasks(project.id).toPromise().then(tasks => {
            const projectData: TaskWithProject = {
              projectId: project.id,
              projectName: project.name,
              tasks: tasks ? tasks.map(task => ({
                taskName: task.name,
                description: task.description,
                dueDate: task.dueDate,
                taskStatus: task.status
              })) : [] // Ensure tasks is always an array
            };
            projectsWithTasks.push(projectData);
          })
        );
  
        Promise.all(projectRequests)
          .then(() => {
            this.dataSource = projectsWithTasks; // Updated to assign grouped data
          })
          .catch(error => {
            console.error('Error fetching tasks:', error); // Log the full error object
            this.snackBar.open(`Error fetching tasks: ${error.message || error}`, 'Close', { duration: 6000 });
          });
      }, error => {
        console.error('Error fetching projects:', error); // Log the full error object
        this.snackBar.open(`Error fetching projects: ${error.message || error}`, 'Close', { duration: 6000 });
      });
    }
  }

  openFormDialog(task: any = null, projectId: number | null = null): void {
    const dialogRef = this.dialog.open(TaskAddeditComponent, {
      data: { task, projectId },
      width: '500px'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadProjectsWithTasks();
      }
    });
  }

  deleteTask(taskId: number, projectId: number): void {
    this.taskService.deleteTask(projectId, taskId).subscribe(() => {
      this.snackBar.open('Task Deleted Successfully', 'Close', { duration: 4000 });
      this.loadProjectsWithTasks();
    }, error => {
      this.snackBar.open(`Error deleting task: ${error}`, 'Close', { duration: 4000 });
    });
  }
}





  // deleteTask(taskId: number): void {
  //   if (confirm('Are you sure you want to delete this task?')) {
  //     this.taskService.deleteTask(this.projectId, taskId).subscribe(
  //       () => {
  //         this.snackBar.open('Task deleted successfully', 'Close', { duration: 2000 });
  //         this.loadTasks();
  //       },
  //       error => {
  //         this.snackBar.open('Error deleting task', 'Close', { duration: 2000 });
  //       }
  //     );
  //   }
  // }

  // deleteTask(task: Task): void {
  //   this.taskService.deleteTask(task.projectId, task.id).subscribe(() => {
  //     this.snackBar.open('Task deleted successfully', '', { duration: 3000 });
  //     this.loadTasks();
  //   });
  // }






  

  // // Define columns to be displayed in project and task tables
  // projectDisplayedColumns: string[] = ['name', 'expand'];
  // taskDisplayedColumns: string[] = ['taskId', 'taskName', 'taskStatus'];
  // tasksGroupedByProject: { [key: string]: Task[] } = {};
  // projects: Project[] = [];

  // constructor(
  //   private taskService: TaskService,
  
  //   private snackBar: MatSnackBar,
  //   private dialog: MatDialog
  // ) { }

  // tasks: Task[] = [];
  // //projects: Project[] = [];
  // projects: any[] = [];  // To store projects with tasks
  // dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  // projectId: number | null = null;  // Keep this as null initially until we get projects
  // isLoading: boolean = false;
  // selectedCompanyId: number | null = null;


  // constructor(
  //   private taskService: TaskService,
  //   private projectService: ProjectService,
  //   private companyService: CompanyService,
  //   private dialog: MatDialog,
  //   private snackBar: MatSnackBar,
  //   //@Inject(MAT_DIALOG_DATA) public data: { projectId: number }
  // ) {
  //   //this.projectId = data.projectId;
  // } 

  // ngOnInit(): void {
  //   //this.loadProjects();
  //   this.fetchProjectsWithTasks();
  // }

  // ngOnInit(): void {
  //   this.companyService.getSelectedCompanyId().subscribe(id => {
  //     if (id !== null) {
  //       this.selectedCompanyId = id;
  //       //this.fetchProjectsWithTasks();;
  //       this.loadProjects();
  //     }
  //   });
  // }

  // Method to load projects and their corresponding tasks
//   loadProjectsWithTasks() {
//     if (this.selectedCompanyId !== null) {
//       this.isLoading = true;
//     this.projectService.getProjects(this.selectedCompanyId).subscribe((projects) => {
//       this.projects = projects;
//       this.projects.forEach(project => {
//         this.taskService.getTasksByProjectId(project.id).subscribe((tasks) => {
//           project.tasks = tasks;  // Assign tasks to each project
//         });
//       });
//     });
//   }
// }

//   loadProjects(): void {
//     if (this.selectedCompanyId !== null) {
//       this.isLoading = true;
//       this.projectService.getProjectsWithTasksByCompanyId(this.selectedCompanyId).subscribe({
//           next: (projects) => {
//             this.projects = projects;
//             this.isLoading = false;
//           },
//           error: (error) => {
//             this.snackBar.open('Error loading projects', 'Close', { duration: 3000 });
//             this.isLoading = false;
//           }
//         });
//     }
//   }


//   fetchProjectsWithTasks() {
//     if (this.selectedCompanyId !== null) {
//       this.isLoading = true;
  
//       // Fetch projects with task IDs for the selected company
//       this.projectService.getProjectsWithTaskIds(this.selectedCompanyId).subscribe(
//         (projects: Project[]) => {
//           console.log('Fetched projects:', projects);  // Log to see the fetched projects
//           this.projects = projects;
  
//           if (this.projects.length === 0) {
//             console.warn('No projects found.');
//           }
  
//           // For each project, fetch the tasks based on taskIds
//           this.projects.forEach(project => {
//             console.log(`Fetching tasks for project ${project.id}, taskIds: `, project.taskIds);
            
//             if (project.taskIds && project.taskIds.length > 0) {
//               this.taskService.getTasksByIds(project.id, project.taskIds).subscribe(
//                 (tasks: Task[]) => {
//                   console.log(`Fetched tasks for project ${project.id}:`, tasks);
//                   project.tasks = tasks;  // Populate the tasks for this project
//                 },
//                 error => {
//                   console.error(`Error fetching tasks for project ${project.id}:`, error);
//                 }
//               );
//             } else {
//               console.warn(`Project ${project.id} has no taskIds`);
//             }
//           });
//         },
//         error => {
//           console.error('Error fetching projects:', error);
//         }
//       );
//     }
//   }

  // loadTasksForProjects(): void {
  //   this.projects.forEach(project => {
  //     this.taskService.getTasksByProject(project.id).subscribe({
  //       next: (tasks) => {
  //         project.tasks = tasks || [];  // Fallback to empty array if no tasks are found
  //       },
  //       error: () => {
  //         this.snackBar.open(`Error loading tasks for project ${project.name}`, 'Close', { duration: 3000 });
  //       }
  //     });
  //   });
  // }

  // Use this to handle tasks within projects dynamically
  // loadTasksForProject(project: Project): void {
  //   this.taskService.getTasksByProject(project.id).subscribe({
  //     next: (tasks) => {
  //       project.tasks = tasks;
  //     },
  //     error: () => {
  //       this.snackBar.open(`Error loading tasks for project ${project.name}`, 'Close', { duration: 3000 });
  //     }
  //   });
  // }

  

  // openTaskForm(task: any = null, projectId: number): void {
  //   const dialogRef = this.dialog.open(TaskAddeditComponent, {
  //     data: { task, projectId },
  //     width: '500px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadProjects();
  //     }
  //   });
  // }

  // deleteTask(projectId: number, taskId: number): void {
  //   this.taskService.deleteTask(projectId, taskId)
  //     .subscribe(() => {
  //       this.snackBar.open('Task deleted successfully!', 'Close', { duration: 2000 });
  //       this.loadProjects();
  //     });
  // }


  // ngOnInit(): void {
  //   this.companyService.getSelectedCompanyId().subscribe(id => {
  //     if (id !== null) {
  //       this.selectedCompanyId = id;
  //       this.loadProjects(); // Load projects and their tasks
  //       //this.fetchProjectsWithTasks();
  //       //this.loadTasksForProject();
  //     }
  //   });
  // }

  // // Method to load projects and their corresponding tasks
  // loadProjects(): void {
  //   if (this.selectedCompanyId !== null) {
  //     this.isLoading = true;
  //     this.projectService.getProjectsWithTasksByCompanyId(this.selectedCompanyId).subscribe({
  //       next: (projects) => {
  //         this.projects = projects;
  //         this.isLoading = false;
  //       },
  //       error: (error) => {
  //         this.snackBar.open('Error loading projects', 'Close', { duration: 3000 });
  //         this.isLoading = false;
  //       }
  //     });
  //   }
  // }

  // // Method to fetch projects with tasks using task IDs (for cases where tasks need to be fetched individually)
  // fetchProjectsWithTasks() {
  //   if (this.selectedCompanyId !== null) {
  //     this.isLoading = true;

  //     // Fetch projects with task IDs for the selected company
  //     this.projectService.getProjectsWithTaskIds(this.selectedCompanyId).subscribe(
  //       (projects: Project[]) => {
  //         console.log('Fetched projects:', projects);  // Log to see the fetched projects
  //         this.projects = projects;

  //         if (this.projects.length === 0) {
  //           console.warn('No projects found.');
  //         }

  //         // For each project, fetch the tasks based on taskIds
  //         this.projects.forEach(project => {
  //           console.log(`Fetching tasks for project ${project.id}, taskIds: `, project.taskIds);

  //           if (project.taskIds && project.taskIds.length > 0) {
  //             this.taskService.getTasksByIds(project.id, project.taskIds).subscribe(
  //               (tasks: Task[]) => {
  //                 console.log(`Fetched tasks for project ${project.id}:`, tasks);
  //                 project.tasks = tasks;  // Populate the tasks for this project
  //               },
  //               error => {
  //                 console.error(`Error fetching tasks for project ${project.id}:`, error);
  //               }
  //             );
  //           } else {
  //             console.warn(`Project ${project.id} has no taskIds`);
  //           }
  //         });
  //       },
  //       error => {
  //         console.error('Error fetching projects:', error);
  //       }
  //     );
  //   }
  // }

  // // Method to load tasks for a single project
  // loadTasksForProject(project: Project): void {
  //   if (this.selectedCompanyId !== null) {
  //   this.isLoading = true;
  //   this.taskService.getTasksByProject(project.id).subscribe({
  //     next: (tasks) => {
  //       project.tasks = tasks;
  //     },
  //     error: () => {
  //       this.snackBar.open(`Error loading tasks for project ${project.name}`, 'Close', { duration: 3000 });
  //     }
  //   });
  // }}



  // // Open the task form to add or edit a task
  // openTaskForm(task: any = null, projectId: number): void {
  //   const dialogRef = this.dialog.open(TaskAddeditComponent, {
  //     data: { task, projectId },
  //     width: '500px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadProjects();  // Reload projects after task is added or edited
  //     }
  //   });
  // }

  // // Delete a task
  // deleteTask(projectId: number, taskId: number): void {
  //   this.taskService.deleteTask(projectId, taskId)
  //     .subscribe(() => {
  //       this.snackBar.open('Task deleted successfully!', 'Close', { duration: 2000 });
  //       this.loadProjects();  // Reload projects after task is deleted
  //     });
  // }








 // ngOnInit(): void {
  //   this.companyService.getSelectedCompanyId().subscribe(id => {
  //     if (id !== null) {
  //       this.selectedCompanyId = id;
  //       //this.loadProjectsTasks();
  //       this.loadTasks();
  //     }
  //   });
  // }  

  // ngOnInit(): void {
  //   // First, get all projects available
  //   //this.loadProjects();
  //   this.fetchProjects();

  //   // Optionally load the selected company ID if necessary
  //   this.companyService.getSelectedCompanyId().subscribe(id => {
  //     if (id !== null) {
  //       this.selectedCompanyId = id;
  //       // If projectId is already set, load the tasks for that project
  //       if (this.projectId !== null) {
  //         this.loadTasks();
  //       }
  //     }
  //   });
  // }


  // loadProjects(): void {
  //   if (this.selectedCompanyId !== null) {
  //     this.projectService.getProjects(this.selectedCompanyId).subscribe(projects => {
  //       this.projects = projects;

  //       // Set the projectId to the first project or handle the selection logic
  //       if (this.projects.length > 0) {
  //         this.projectId = this.projects[0].id; // Assuming 'id' is the field for project ID
  //         this.loadTasks();
  //       }
  //     });
  //   }
  // }

  // fetchProjects(): void {
  //   this.isLoading = true;
  //   if (this.selectedCompanyId !== null) {
  //     this.projectService.getProjects(this.selectedCompanyId).subscribe(projects => {
  //       this.dataSource.data = projects;
  //       this.isLoading = false;
  //     }, error => {
  //       this.snackBar.open(`Error fetching projects: ${error}`, 'Close', { duration: 6000 });
  //       this.isLoading = false;
  //     });
  //   }
  // }

  // Method to load all available projects
  // loadProjects(): void {
  //   this.projectService.getAllProjects().subscribe((projects: Project[]) => {
  //     this.projects = projects;
      
  //     // Set the projectId based on the first project or some other logic
  //     if (projects.length > 0) {
  //       this.projectId = projects[0].id; // Set projectId to the first available project
  //       this.loadTasks(); // Load tasks for the selected project
  //     } else {
  //       console.warn('No projects available');
  //     }
  //   });
  // }


 // openTaskForm(task?: TaskDTO): void {
  //   const dialogRef = this.dialog.open(TaskAddeditComponent, {
  //     data: { task, projectId: this.projectId },
  //     width: '500px'
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.loadTasks();
  //     }
  //   });
  // }


























 // projects: { projectName: string, tasks: Task[] }[] = [];
  //expandedProject: any; // To track the currently expanded project
  //taskColumns: string[] = ['taskName', 'dueDate', 'status']; // Columns to display for tasks
  //projectsWithTasks: { project: any; tasks: any[] }[] = [];
  //projects: ProjectDTO[] = [];
  //selectedCompanyId: number | null = null;
  //dataSource2: MatTableDataSource<ProjectDTO> = new MatTableDataSource<ProjectDTO>([]);
  // projects: ProjectDTO[] = [];

// loadProjectsTasks(): void {
  //   if (this.selectedCompanyId !== null) {
  //     this.projectService.getProjectsWithTasksByCompanyId(this.selectedCompanyId)
  //       .subscribe((projects: ProjectDTO[]) => {
  //         this.projects = projects.map(project => ({
  //           ...project,
  //           tasks: project.tasks || []  // Ensure tasks array is initialized
  //         }));
  //         this.isLoading = false;
  //       }, error => {
  //         this.snackBar.open(`Error fetching projects: ${error}`, 'Close', { duration: 6000 });
  //         this.isLoading = false;
  //       });
  //   }
  // }  

  // loadProjectsTasks(): void {
  //   if (this.selectedCompanyId !== null) {
  //     this.projectService.getProjectsWithTasksByCompanyId(this.selectedCompanyId)
  //       .subscribe((projects: ProjectDTO[]) => {
  //         projects.forEach((project) => {
  //           if (project.tasks && project.tasks.length > 0) {
  //             const taskIds = project.tasks.map(task => task.id); // Extract taskIds from tasks
  //             if (taskIds.length > 0) {
  //               this.taskService.getTasksByIds(taskIds).subscribe((tasks: TaskDTO[]) => {
  //                 project.tasks = tasks; // Reassign the tasks after fetching
  //               });
  //             }
  //           } else {
  //             project.tasks = [];
  //           }
  //         });
  //       });
  //   }
  // }






  // isLoading: boolean = false;
  // selectedCompanyId: number | null = null;

  // // Define columns to be displayed in project and task tables
  // projectDisplayedColumns: string[] = ['name', 'expand'];
  // taskDisplayedColumns: string[] = ['taskId', 'taskName', 'taskStatus'];
  // tasksGroupedByProject: { [key: string]: Task[] } = {};
  // projects: Project[] = [];

  // constructor(
  //   private taskService: TaskService,
  //   private projectService: ProjectService,
  //   private companyService: CompanyService,
  //   private snackBar: MatSnackBar,
  //   private dialog: MatDialog
  // ) { }

  // ngOnInit(): void {
  //   this.companyService.getSelectedCompanyId().subscribe(id => {
  //     if (id !== null) {
  //       this.selectedCompanyId = id;
  //       //this.loadProjectsTasks();
  //       this.loadTasks();
  //     }
  //   });
  // }  

  // // loadTasks(): void {
  // //   this.taskService.getAllTasksGroupedByProject().subscribe(
  // //     (data) => {
  // //       this.tasksGroupedByProject = data;
  // //       this.snackBar.open('Tasks loaded successfully', 'Close', { duration: 2000 });
  // //     },
  // //     (error) => {
  // //       this.snackBar.open('Error loading tasks', 'Close', { duration: 2000 });
  // //     }
  // //   );
  // // }



  // loadTasks(): void {
  //   this.taskService.getAllTasksGroupedByProject().subscribe(
  //     (data) => {
  //       this.tasksGroupedByProject = data;
  
  //       // Map the project IDs and filter out undefined values
  //       this.projects = Object.keys(this.tasksGroupedByProject)
  //         .map(id => this.projects.find(p => p.id == +id))
  //         .filter((project): project is Project => project !== undefined);
  
  //       this.snackBar.open('Tasks loaded successfully', 'Close', { duration: 2000 });
  //     },
  //     (error) => {
  //       this.snackBar.open('Error loading tasks', 'Close', { duration: 2000 });
  //     }
  //   );
  // }

  // openTaskDialog(projectId?: number, task?: Task): void {
  //   const dialogRef = this.dialog.open(TaskAddeditComponent, {
  //     width: '400px',
  //     data: { task, projectId }
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       this.loadTasks();
  //       this.snackBar.open(result.message, 'Close', { duration: 2000 });
  //     }
  //   });
  // }

  // deleteTask(taskId: number, projectId: number): void {
  //   if (confirm('Are you sure you want to delete this task?')) {
  //     this.taskService.deleteTask(projectId, taskId).subscribe(
  //       () => {
  //         this.loadTasks();
  //         this.snackBar.open('Task deleted successfully', 'Close', { duration: 2000 });
  //       },
  //       (error) => {
  //         this.snackBar.open('Error deleting task', 'Close', { duration: 2000 });
  //       }
  //     );
  //   }
  // }  
