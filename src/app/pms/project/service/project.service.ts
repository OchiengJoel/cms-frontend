import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Project } from '../model/project';

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

  getProjects(companyId: number): Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/${companyId}/projects/list`);
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

  deleteParcel(companyId:number, parcelId:number):Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/parcels/delete/${parcelId}`).pipe(
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
