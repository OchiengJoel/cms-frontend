import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Accounts } from 'src/app/model/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private baseUrl: string;

  constructor(private http: HttpClient) {

    this.baseUrl = 'http://localhost:8070/api/v1/accounts';

   }

   getAccounts(): Observable<Accounts[]>{
    return this.http.get<Accounts[]>(`${this.baseUrl}/list`);
   }

   getAccountById(id: number):Observable<Accounts>{
    return this.http.get<Accounts>(`${this.baseUrl}/${id}`);
   }
    
   createAccount(accounts: Accounts):Observable<Accounts>{
    return this.http.post<Accounts>(`${this.baseUrl}/save`, accounts);
   }

   updateAccount(id: number, accounts: Accounts):Observable<Accounts>{
    return this.http.put<Accounts>(`${this.baseUrl}/${id}`, accounts);
   }

   deleteAccount(id: number):Observable<Accounts>{
    return this.http.delete<Accounts>(`${this.baseUrl}/${id}`);
   }
  
}
