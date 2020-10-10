import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';
// import 'rxjs/add/observable/throw';
// import 'rxjs/add/observable/map';
// import 'rxjs/add/observable/throw'
// // import { Http, Headers, Response, RequestOptions } from '@angular/common/http';
// import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private baseUrl = 'http://localhost:2020/click';

  constructor( private http:HttpClient) { 
    
  }

  createUser(user: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, user);
  }

  login(user:Object):Observable<object>{
    return this.http.post(`${this.baseUrl}`, user);
  }
}
