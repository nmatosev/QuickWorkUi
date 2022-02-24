import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Message} from "../message";
import {SendMessageService} from '../send-message.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {MessageDataService} from "../messageDataService";

@Component({
  selector: 'app-ad-messages-details',
  templateUrl: './ad-messages-details.component.html',
  styleUrls: ['./ad-messages-details.component.css']
})
export class AdMessagesDetailsComponent implements OnInit {
  public messages: Message[];

  content: string;
  errorMessage = '';
  loggedUser: any;
  chatInitator: string;
  adId: number;
  text: "";

  form: any = {
    messageReply: null,
  };

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private messageService: SendMessageService,
              private tokenStorageService: TokenStorageService, private messageDataService: MessageDataService) {
  }

  @Input() public parentValue: string;


  ngOnInit(): void {
    this.loggedUser = this.tokenStorageService.getUser();

    this.messages = this.messageDataService.messages;
    this.adId = this.messageDataService.adId;
    this.chatInitator = this.messages[0].user1;
    this.messages.forEach(
      p=> {
        console.log("msgs in chat " + p.messageContent + " for ad id " + p.adId);
      }
    )
  }

  sendMessage(): void {
    const messageContent = this.form.messageReply;
    let sender = this.loggedUser.username;
    let receiver = "";
    //if ad owner is sending msg
    if(sender != this.chatInitator) {
      receiver = this.chatInitator;
    }
    console.log("send Message - ad id " + this.adId + " msg " + messageContent + " from user " + JSON.stringify(sender));
    this.messageService.sendMessageChat(this.adId, messageContent, sender, receiver).subscribe(
      data => {
        console.log("Sending" + data);
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
      user1: this.loggedUser.username,
      adId: this.adId
    });
    this.messages.push(newMessage);
    console.log("reloaded new " + JSON.stringify(this.messages));

  }


}
