import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import {environment} from '../environments/environment';
const AUTH_API = 'http://localhost:8080/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'public/authenticate', {
      username: username,
      password: password
    }, httpOptions);
  }

  register(username: string, email: string, phoneNumber:string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'public/register', {
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      password: password
    }, httpOptions);
  }

}
