import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project} from '../model/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly baseUrl: string = 'http://localhost:8070/api/v1/company';

  constructor(private http: HttpClient) {}

  getAllProjects(companyId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}/${companyId}/projects/list`).pipe(
      catchError(this.handleError)
    );
  }

  getProject(companyId: number, projectId: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${companyId}/projects/${projectId}`).pipe(
      catchError(this.handleError)
    );
  }

  createProject(companyId: number, project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/${companyId}/projects/create`, project).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(companyId: number, projectId: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/${companyId}/projects/update/${projectId}`, project).pipe(
      catchError(this.handleError)
    );
  }

  deleteProject(companyId: number, projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/projects/delete/${projectId}`).pipe(
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
