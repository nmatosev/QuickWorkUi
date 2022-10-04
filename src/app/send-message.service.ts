import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "./message";
import {AdChat} from "./ad-chat";
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

  sendMessageModal(adId: number, messageContent: string, sender:string): Observable<any> {
    return this.http.post(this.apiServerUrl + '/public/message', {
      adId: adId,
      messageContent: messageContent,
      sender: sender
    }, httpOptions);
  }

  sendMessageChat(adId: number, messageContent: string, sender:string, receiver:string): Observable<any> {
    return this.http.post(this.apiServerUrl + '/public/message', {
      adId: adId,
      messageContent: messageContent,
      sender: sender,
      receiver: receiver
    }, httpOptions);
  }

  public getMessagesForUser(username: string): Observable<AdChat[]> {
    return this.http.get<AdChat[]>(`${this.apiServerUrl}/public/${username}`)
  }

  public getMessagesForUserOnAd(username: string, adId:number): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.apiServerUrl}/public/${adId}/${username}`)
  }
}
