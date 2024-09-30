import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, forkJoin, throwError } from 'rxjs';
import { Task, } from '../model/task';



@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'http://localhost:8070/api/v1/projects';

  constructor(private http: HttpClient) {}

  getAllTasks(projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${projectId}/tasks`).pipe(
      catchError(this.handleError)
    );
  }

  getTask(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${projectId}/tasks/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }

  createTask(projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${projectId}/tasks/create`, task).pipe(
      catchError(this.handleError)
    );
  }

  updateTask(projectId: number, taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${projectId}/tasks/update/${taskId}`, task).pipe(
      catchError(this.handleError)
    );
  }

  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${projectId}/tasks/${taskId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}


  // private baseUrl = '/api/v1/projects'; // Adjust base URL as necessary

  // constructor(private http: HttpClient) { }


  // // getTasksByProject(projectId: number): Observable<Task[]> {
  // //   return this.http.get<Task[]>(`${this.baseUrl}/${projectId}/tasks/list`);
  // // }

  // // Retrieve all tasks for a given project
  // getTasksByProject(projectId: number): Observable<Task[]> {
  //   return this.http.get<Task[]>(`${this.baseUrl}/${projectId}/tasks/list`);
  // }

  // // Retrieve all projects
  // getAllProjects(): Observable<Project[]> {
  //   return this.http.get<Project[]>(`${this.baseUrl}/list`);
  // }

  // getTaskById(projectId: number, taskId: number): Observable<Task> {
  //   return this.http.get<Task>(`${this.baseUrl}/${projectId}/tasks/${taskId}`);
  // }

  // getTasksByIds(projectId: number, taskIds: number[]): Observable<Task[]> {
  //   return this.http.post<Task[]>(`${this.baseUrl}/${projectId}/tasks/listByIds`, taskIds);
  // }

  // createTask(projectId: number, task: Task): Observable<Task> {
  //   return this.http.post<Task>(`${this.baseUrl}/${projectId}/tasks/create`, task);
  // }

  // updateTask(projectId: number, taskId: number, task: Task): Observable<Task> {
  //   return this.http.put<Task>(`${this.baseUrl}/${projectId}/tasks/update/${taskId}`, task);
  // }

  // deleteTask(projectId: number, taskId: number): Observable<void> {
  //   return this.http.delete<void>(`${this.baseUrl}/${projectId}/tasks/delete/${taskId}`);
  // }

  // deleteSelectedTasks(projectId: number, taskIds: number[]): Observable<void> {
  //   return this.http.request<void>('DELETE', `${this.baseUrl}/${projectId}/tasks/deleteSelected`, {
  //     body: taskIds
  //   });
  // }

  // // Fetch tasks for a specific project within a company
  // getTasksByProjectId(projectId: number): Observable<any[]> {
  //   return this.http.get<any[]>(`${this.baseUrl}/${projectId}/tasks/list`);
  // }

  // // Fetch tasks by task IDs for a project under a company
  // getTasksByIds1(companyId: number, projectId: number, taskIds: number[]): Observable<any[]> {
  //   return this.http.post<any[]>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/listByIds`, taskIds);
  // }


//  // Get all tasks grouped by project
//  getAllTasksGroupedByProject(): Observable<{ [key: number]: Task[] }> {
//   return this.getAllProjects().pipe(
//     // Use switchMap to combine project retrieval with task fetching
//     switchMap((projects: Project[]) => {
//       // Map projects to observables of their respective tasks
//       const projectTasksObservables = projects.map((project) =>
//         this.getTasksByProject(project.id).pipe(
//           map((tasks: TaskDTO[]) => ({ [project.id]: tasks }))
//         )
//       );

//       // Use forkJoin to wait for all tasks to be fetched for each project
//       return forkJoin(projectTasksObservables).pipe(
//         // Combine all task results into a single object
//         map((taskGroups) => taskGroups.reduce((acc, curr) => ({ ...acc, ...curr }), {}))
//       );
//     })
//   );
// } 


