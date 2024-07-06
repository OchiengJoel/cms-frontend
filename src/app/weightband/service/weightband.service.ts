import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { WeightBand } from 'src/app/company/model/company';

@Injectable({
  providedIn: 'root'
})
export class WeightbandService {

  baseUrl:string;

  constructor(
    private http:HttpClient,
  ) {
    this.baseUrl = 'http://localhost:8070/api/v1/company'
   }


   getAllWeightBands(companyId:number):Observable<WeightBand[]>{
    return this.http.get<WeightBand[]>(`${this.baseUrl}/${companyId}/weightbands/list`)
   }

   getWeightBandById(companyId: number, weightBandId: number): Observable<WeightBand> {
    return this.http.get<WeightBand>(`${this.baseUrl}/${companyId}/weightbands/${weightBandId}`).pipe(
      catchError(this.handleError)
    );
  }

  createWeightBand(companyId:number, weightBand:WeightBand): Observable<WeightBand>{
    return this.http.post<WeightBand>(`${this.baseUrl}/${companyId}/weightbands/create`, weightBand).pipe(
      catchError(this.handleError)
    );
  }

  updateWeightBand(companyId:number, weightBandId:number, weightBand:WeightBand):Observable<WeightBand>{
    return this.http.put<WeightBand>(`${this.baseUrl}/${companyId}/weightbands/update/${weightBandId}`, weightBand).pipe(
      catchError(this.handleError)
    )
  }

  // updateBranch(companyId:number,branch:Branch):Observable<Branch>{
  //   return this.http.put<Branch>(`${this.baseUrl}/${companyId}/branches/${branch.id}`, branch).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  
  deleteWeightBand(companyId: number, weightBandId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${companyId}/weightbands/delete/${weightBandId}`).pipe(
      catchError(this.handleError)
    );
  }

  deleteSelectedeightBand(companyId: number, weightBandIds: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${companyId}/weightbands/delete/batch`, weightBandIds).pipe(
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
