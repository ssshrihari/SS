import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private baseurl="http://localhost:2020";
  constructor(private http:HttpClient) { }
  create(data: any | null){
    return this.http.post(`${this.baseurl}`+'/click',data);
  }

}
