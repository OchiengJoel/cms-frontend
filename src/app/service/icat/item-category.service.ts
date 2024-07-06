import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ItemCategory } from 'src/app/model/item-category';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {
  //baseUrl: string = "http://localhost:3000/category/";

  private baseUrl: string;

  constructor(private httpClient:HttpClient) {

    this.baseUrl = 'http://localhost:8070/api/v1/icat/'

   }

  // GetItemCategory(): Observable<ItemCategory[]>{
  //   return this.http.get<ItemCategory[]>("http://localhost:3000/category");
  // }

  getItemCategoryList(): Observable<ItemCategory[]>{
    return this.httpClient.get<ItemCategory[]>(`${this.baseUrl}list`);
  }

  getItemCategoryById(id: number):Observable<ItemCategory> {
    return this.httpClient.get<ItemCategory>(`${this.baseUrl}${id}`);
  }

  addItemCategory(itemCategory: ItemCategory): Observable<any>{
    return this.httpClient.post(this.baseUrl + `save`, itemCategory);
  }

  updateItemCategory(id: number, itemCategory: ItemCategory): Observable<any>{
    return this.httpClient.put(`${this.baseUrl}${id}`, itemCategory);
  }
  

  deleteItemCategory(id: number):Observable<any>{
    return this.httpClient.delete(`${this.baseUrl}${id}`);
  }


}

