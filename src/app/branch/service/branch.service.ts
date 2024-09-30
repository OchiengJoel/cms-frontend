import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Branch, BranchDTO } from 'src/app/company/model/company';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  baseUrl:string;
  constructor(
    private http: HttpClient
  ) { 

    this.baseUrl = 'http://localhost:8070/api/v1/company'
  }


  getAllBranches(companyId: number): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.baseUrl}/${companyId}/branches/list`).pipe(
      catchError(this.handleError)
    );
  }

  getBranchById(companyId: number, branchId: number): Observable<Branch> {
    return this.http.get<Branch>(`${this.baseUrl}/${companyId}/branches/${branchId}`).pipe(
      catchError(this.handleError)
    );
  }

  createBranch(companyId: number, branch: Branch): Observable<Branch> {
    return this.http.post<Branch>(`${this.baseUrl}/${companyId}/branches/save`, branch).pipe(
      catchError(this.handleError)
    );
  }  

   updateBranch(companyId: number, branchId: number, branch: Branch): Observable<Branch> {
    return this.http.put<Branch>(`${this.baseUrl}/${companyId}/branches/update/${branchId}`, branch).pipe(
      catchError(this.handleError)
    );
  }  
  deleteBranch(companyId: number, branchId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/branches/delete/${branchId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteSelectedBranches(companyId: number, branchIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${companyId}/branches/delete/batch`, branchIds).pipe(
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
