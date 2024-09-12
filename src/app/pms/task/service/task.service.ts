import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl: string;
  constructor(
    private http:HttpClient
  ) { 

    this.baseUrl=`http://localhost:8070/api/v1/company`;
  }

  getTasksByProject(companyId: number, projectId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/list`);
  }

  getTask(companyId: number, projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/${taskId}`);
  }

  createTask(companyId: number, projectId: number, task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/create`, task);
  }

  updateTask(companyId: number, projectId: number, taskId: number, task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/update/${taskId}`, task);
  }

  deleteTask(companyId: number, projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/projects/${projectId}/tasks/delete/${taskId}`);
  }
}
