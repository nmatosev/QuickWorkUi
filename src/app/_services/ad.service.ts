import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ad} from "../ad";

const AUTH_API = 'http://localhost:8080/public/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AdService {

  constructor(private http: HttpClient) { }

  saveAd(title: string, content: string, countyId: number, userId: number) {
    return this.http.post(AUTH_API + 'ad', {
      title: title,
      content: content,
      countyId: countyId,
      userId: userId
    }, httpOptions )
  }

}
