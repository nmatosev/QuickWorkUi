import {Observable} from 'rxjs';
import {User} from './user';
import {Ad} from './ad';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {County} from "./county";
import {Review} from "./review";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }


  //mapiranje backend objekta u fe
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/public/users`);
  }


  public getActiveAds(): Observable<Ad[]> {
    //poredi po karticama
    return this.http.get<Ad[]>(`${this.apiServerUrl}/public/ads`);
  }

  public getReview(username: string): Observable<Review[]> {
    //poredi po karticama
    return this.http.get<Review[]>(`${this.apiServerUrl}/review/${username}`);
  }

  public getCounties(): Observable<County[]> {
    return this.http.get<County[]>(`${this.apiServerUrl}/public/counties`)
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/user`, {responseType: 'text'});
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/admin`, {responseType: 'text'});
  }

  getImage(username: string): Observable<any> {
    //Make a call to backend to get the Image Bytes.
    console.log("Call to get profile pic for username " + username);
    return this.http.post(this.apiServerUrl + '/public/profile-picture', {
      username: username
    }, httpOptions)
  }

}
