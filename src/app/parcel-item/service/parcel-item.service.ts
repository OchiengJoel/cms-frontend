import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ParcelItem } from '../model/parcel-item';

@Injectable({
  providedIn: 'root'
})
export class ParcelItemService {

  private baseUrl: string;

  constructor(
    private http: HttpClient) { 

    this.baseUrl = 'http://localhost:8070/api/v1/items';
  }

  getParcelItems():Observable<ParcelItem[]>{
    return this.http.get<ParcelItem[]>(`${this.baseUrl}/list`);
  }

  getParcelItemyId(id: number):Observable<ParcelItem>{
    return this.http.get<ParcelItem>(`${this.baseUrl}/${id}`);
  }

  createParcelItem(parcelItem:ParcelItem):Observable<ParcelItem>{
    return this.http.post<ParcelItem>(`${this.baseUrl}/create`, parcelItem);
  }

  // updateParcelItem(id: number, parcelItem: ParcelItem): Observable<ParcelItem> {
  //   return this.http.put<ParcelItem>(`${this.baseUrl}/update/${id}`, parcelItem);
  // }

  updateParcelItem(parcelItem: ParcelItem): Observable<ParcelItem> {
    return this.http.put<ParcelItem>(`${this.baseUrl}/update/${parcelItem.id}`, parcelItem);
  }  
  
  deleteParcelItem(id: number):Observable<ParcelItem>{
    return this.http.delete<ParcelItem>(`${this.baseUrl}/delete/${id}`);
  }
}
