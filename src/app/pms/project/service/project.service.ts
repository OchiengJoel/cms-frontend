import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  baseUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.baseUrl = 'http://localhost:8070/api/v1/company';

  }

  // getAllProjects(): Observable<Project[]> {
  //   return this.http.get<Project[]>(this.baseUrl);
  // }

  getAllProjects(companyId: number): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/${companyId}/projects/list`);
  }
  
  // Get projects with task IDs for a specific company
  getProjectsWithTaskIds(companyId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${companyId}/projects/listWithTaskIds`);
  }

  getProject(companyId: number, projectId: number):Observable<Project>{
    return this.http.get<Project>(`${this.baseUrl}/${companyId}/projects/${projectId}`);
  }

  createProject(companyId: number, project: Project):Observable<Project>{
    return this.http.post<Project>(`${this.baseUrl}/${companyId}/projects/create`, project);
  }

  updateProject(companyId: number, projectId:number, project: Project):Observable<Project>{
    return this.http.put<Project>(`${this.baseUrl}/${companyId}/projects/update/${projectId}`, project)
  }

  deleteProject(companyId: number, projectId:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/projects/delete/${projectId}`);
  }

  deleteSelectedProject(companyId:number, projectId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/projects/delete/${projectId}`).pipe(
      catchError(this.handleError)
    );    
  }

  // Fetch projects with tasks by company ID
  getProjectsWithTasksByCompanyId(companyId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/${companyId}/projects/projects-tasks`);
  }

  // Fetch a project with task IDs for a specific company
  getProjectWithTasks(companyId: number, projectId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${companyId}/projects/${projectId}`);
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
