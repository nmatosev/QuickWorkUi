import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, NavigationStart} from '@angular/router';
import {Message} from "../message";
import {SendMessageService} from '../send-message.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {AdChat} from "../ad-chat";
import {MessageDataService} from "../messageDataService";

@Component({
  selector: 'app-ad-messages-details',
  templateUrl: './ad-messages-details.component.html',
  styleUrls: ['./ad-messages-details.component.css']
})
export class AdMessagesDetailsComponent implements OnInit {
  messageReply: string;
  public adMessages: AdChat[];
  public messages: Message[];

  content: string;
  errorMessage = '';
  loggedUser: any;
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
    //this.messages = Object.values(history.state);
    this.loggedUser = this.tokenStorageService.getUser();

    this.messages = this.messageDataService.messages;
    this.adId = this.messages[0].adId;
    console.log(" parent msgs " + this.messageDataService.messages[0].messageContent);

    //dobacit adId ovdje
    /*    this.messageService.getMessagesForUserOnAd(this.loggedUser.username, this.adId).subscribe(
          (response: Message[]) => {
            this.messages = response;
          },
          err => {
            this.content = JSON.parse(err.error).message;
          }
        );
        if (this.adMessages.length > 0) {
          this.adId = this.adMessages[0].adId;
          console.log("1ad id " + this.adId + " username " + this.loggedUser.username + " msg " + this.adMessages[0].content)
          this.adMessages.splice(this.adMessages.length - 1, 1);
        }*/
  }

  sendMessage(): void {
    const messageContent = this.form.messageReply;
    let sender = this.messages[0].user1;
    console.log("send Message - ad id " + this.adId + " msg " + messageContent + " from user " + sender);

    this.messageService.sendMessage(this.adId, messageContent, sender).subscribe(
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
