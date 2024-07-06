import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { EmailSettings } from 'src/app/company/model/company';

@Injectable({
  providedIn: 'root'
})
export class EmailSmsService {

  baseUrl: string;

  constructor(
    private http:HttpClient
  ) { 

    this.baseUrl = 'http://localhost:8070/api/v1/company';
  }

  getAllEmailSettings(companyId:number):Observable<EmailSettings[]>{
    return this.http.get<EmailSettings[]>(`${this.baseUrl}/${companyId}/notification/listEmail`).pipe(
      catchError(this.handleError)
    )

  }

  createEmailSettings(companyId:number, emailSettings:EmailSettings): Observable<EmailSettings>{
    return this.http.post<EmailSettings>(`${this.baseUrl}/${companyId}/notification/createEmail`, emailSettings).pipe(
      catchError(this.handleError)
    )
  }

  updateEmailSettings(companyId:number, emailSettingsId:number, emailSettings:EmailSettings): Observable<EmailSettings>{
    return this.http.put<EmailSettings>(`${this.baseUrl}/${companyId}/notification/update/${emailSettingsId}`, emailSettings).pipe(
      catchError(this.handleError)
    )
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
