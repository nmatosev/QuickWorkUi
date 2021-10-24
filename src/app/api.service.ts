import { Observable } from 'rxjs';
import { User } from './user';
import { Ad } from './ad';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  //mapiranje backend objekta u fe
  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}/public/users`);
  }


  getActiveAds(): Observable<Ad[]> {
    //poredi po karticama
    return this.http.get<Ad[]>(`${this.apiServerUrl}/public/ads`);
  }

  getUserBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/user`, { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(`${this.apiServerUrl}/admin`, { responseType: 'text' });
  }

}
