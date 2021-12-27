import { Component, OnInit } from '@angular/core';
import { SendMessageService } from '../send-message.service';
import { Message } from "../message";
import { AdMessage } from "../ad-message";
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-ad-messages',
  templateUrl: './ad-messages.component.html',
  styleUrls: ['./ad-messages.component.css']
})
export class AdMessagesComponent implements OnInit {
  currentUser: any;

  public messages: Message[];
  public adMessages: AdMessage[];
  content: string;
  errorMessage = '';
  data: any;
  form: any = {
    messageContent: null,
  };

  constructor(private token: TokenStorageService, private messageService: SendMessageService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("currentUser " + this.currentUser.username)
    this.messageService.getMessagesForUser(this.currentUser.username).subscribe(
      (response: AdMessage[]) => {
        this.adMessages = response;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    console.log("messages " + this.adMessages)
  }


}
