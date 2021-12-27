import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { Message } from "../message";
import { SendMessageService } from '../send-message.service';
import {TokenStorageService} from '../_services/token-storage.service';

@Component({
  selector: 'app-ad-messages-details',
  templateUrl: './ad-messages-details.component.html',
  styleUrls: ['./ad-messages-details.component.css']
})
export class AdMessagesDetailsComponent implements OnInit {
  messageReply: string;
  public messages: Message[];
  errorMessage = '';
  loggedUser : any;
  adId: number;
  text: "";

  form: any = {
    messageReply: null,
  };

  constructor(private router:Router, private activatedRoute:ActivatedRoute, private sendMessageService: SendMessageService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.messages = Object.values(history.state);
    this.loggedUser = this.tokenStorageService.getUser();
    if(this.messages.length > 0) {
      this.adId = this.messages[0].adId;
      console.log("ad id " + this.adId + " username " + this.loggedUser.username)
      this.messages.splice(this.messages.length-1, 1);
    }
  }

  sendMessage(): void {
    const messageContent = this.form.messageReply;
    console.log("send Message - ad id " + this.adId + " msg " + messageContent + " from user " + this.loggedUser.username);
    this.sendMessageService.sendMessage(this.adId, messageContent, this.loggedUser.username).subscribe(
      data => {
       console.log(data);
      },
      err => {
       this.errorMessage = err.error.message;
      }
    );
    this.reloadPage(messageContent);
  }

  reloadPage(messageContent: string): void {
    //window.location.reload();
    /*this.sendMessageService.getMessagesForUserOnAd(this.loggedUser.username, this.adId).subscribe(
      (response: Message[]) => {
        this.messages = response;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
      }
    );*/
    this.form.messageReply = "";
    console.log("reloaded " + JSON.stringify(this.messages));
    const newMessage = <Message>({
        messageContent: messageContent,
        sender: this.loggedUser.username
    });
    this.messages.push(newMessage);
    console.log("reloaded new " + JSON.stringify(this.messages));

  }


}
