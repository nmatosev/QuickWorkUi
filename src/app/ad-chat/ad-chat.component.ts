import {Component, OnInit} from '@angular/core';
import {SendMessageService} from '../send-message.service';
import {Message} from "../message";
import {AdChat} from "../ad-chat";
import {TokenStorageService} from '../_services/token-storage.service';
import {MessageDataService} from "../messageDataService";

@Component({
  selector: 'app-ad-messages',
  templateUrl: './ad-chat.component.html',
  styleUrls: ['./ad-chat.component.css']
})
export class AdChatComponent implements OnInit {
  currentUser: any;

  public messages: Message[];
  public adChats: AdChat[];
  content: string;
  errorMessage = '';
  data: any;
  adId: number;
  form: any = {
    messageContent: null,
  };

  constructor(private token: TokenStorageService, private messageService: SendMessageService, private dataService: MessageDataService) {
  }

  ngOnDestroy() {
    //provides chat details in ad messages-details component
    this.dataService.messages = this.messages;
    this.dataService.adId = this.adId;
  }

  clickOnChat(adId: number): void {
    console.log("ad id clicked " + adId);
    this.adChats.forEach(
      chat => {
        if (chat.adId == adId) {
          this.messages = chat.messages;
          this.adId = adId;
        }
      }
    )
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("currentUser " + this.currentUser.username)
    this.messageService.getMessagesForUser(this.currentUser.username).subscribe(
      (response: AdChat[]) => {
        this.adChats = response;
        this.messages = this.adChats[0].messages;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    console.log("ad messages " + this.adChats + " msgs " + this.messages);
  }


}
