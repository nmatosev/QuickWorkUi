import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "./message";
import {environment} from '../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {
  private apiServerUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }
  username: string;

  sendMessage(adId: number, messageContent: string, sender:string): Observable<any> {
    return this.http.post(this.apiServerUrl + '/public/sendMessage', {
      adId: adId,
      messageContent: messageContent,
      sender: sender
    }, httpOptions);
  }

  public getMessagesForUser(username: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiServerUrl}/public/${username}`)
  }
}
