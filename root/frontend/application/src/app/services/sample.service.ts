import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseurl="http://localhost:2020/click";
@Injectable({
  providedIn: 'root'
})
export class SampleService {
  constructor(private http:HttpClient) { }
  create(data: any | null){
    return this.http.post(baseurl,data);
  }

  post(data:any|null){
    return this.http.post(baseurl,data);
  }
}
