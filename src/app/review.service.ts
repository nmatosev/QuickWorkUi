import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
const AUTH_API = 'http://localhost:8080/public/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  sendReview(reviewerUsername: string, reviewedUsername: string, content:string, rating: number): Observable<any> {
    return this.http.post(AUTH_API + 'saveReview', {
      reviewerUsername: reviewerUsername,
      reviewedUsername: reviewedUsername,
      content: content,
      rating: rating
    }, httpOptions);
  }
}
