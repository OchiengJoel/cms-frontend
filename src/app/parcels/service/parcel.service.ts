import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Parcel } from 'src/app/company/model/company';


@Injectable({
  providedIn: 'root'
})
export class ParcelService {

  baseUrl: string;

  constructor(
    private http:HttpClient
  ) { 

    this.baseUrl ='http://localhost:8070/api/v1/company'
    
  }

  getAllParcels(companyId:number): Observable<Parcel[]>{
    return this.http.get<Parcel[]>(`${this.baseUrl}/${companyId}/parcels/list`).pipe(
      catchError(this.handleError)
    )
  }

  getParcelById(companyId:number, parcelId: number): Observable<Parcel>{
    return this.http.get<Parcel>(`${this.baseUrl}/${companyId}/parcels/${parcelId}`).pipe(
      catchError(this.handleError)
    );
  }

  // createParcel(companyId:number, parcel:Parcel):Observable<Parcel>{
  //   return this.http.post<Parcel>(`${this.baseUrl}/${companyId}/parcels/create`, parcel).pipe(
  //     catchError(this.handleError)
  //   );
  // }

  createParcel(companyId: number, parcel: Parcel):Observable<Parcel> {
    return this.http.post<Parcel>(`${this.baseUrl}/${companyId}/parcels/create`, parcel).pipe(
        catchError(this.handleError)
      );
  }

  updateParcel(companyId:number, parcelId:number, parcel:Parcel):Observable<Parcel>{
    return this.http.put<Parcel>(`${this.baseUrl}/${companyId}/parcels/update/${parcelId}`, parcel).pipe(
      catchError(this.handleError)
    );
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
