import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseViewModel } from '../models/response-view-model';

@Injectable({
  providedIn: 'root'
})
export class GenericService {

  apiURL = "https://jsonplaceholder.typicode.com"
  constructor(private _HttpClient:HttpClient) { }

  get(url:string){
    return this._HttpClient.get<ResponseViewModel>(`${this. apiURL}/${url}`);
  }

  post(url:string, body:any){
    return this._HttpClient.post<ResponseViewModel>(`${this. apiURL}/${url}`,body);
  }

  put(url:string,id:number, body:any){
    return this._HttpClient.put<ResponseViewModel>(`${this. apiURL}/${url}/${id}`,body);
  }

  delete(url:string, id:number){
    console.log(`${this. apiURL}/${url}/${id}`)
    return this._HttpClient.delete<ResponseViewModel>(`${this. apiURL}/${url}/${id}`);
  }
}
