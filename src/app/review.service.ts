import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }


  sendReview(reviewerUsername: string, reviewedUsername: string, content:string, rating: number): Observable<any> {
    return this.http.post(environment.apiUrl + '/public/review', {
      reviewerUsername: reviewerUsername,
      reviewedUsername: reviewedUsername,
      content: content,
      rating: rating
    }, httpOptions);
  }
}
