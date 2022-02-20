import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { SendMessageService } from '../send-message.service';
import { Message } from "../message";
import { AdChat } from "../ad-chat";
import { TokenStorageService } from '../_services/token-storage.service';
import { AdMessagesDetailsComponent } from "../ad-messages-details/ad-messages-details.component";
import { MessageDataService } from "../messageDataService";

@Component({
  selector: 'app-ad-messages',
  templateUrl: './ad-chat.component.html',
  styleUrls: ['./ad-chat.component.css']
})
export class AdChatComponent implements OnInit {
  currentUser: any;

  public messages: Message[];
  public adMessages: AdChat[];
  content: string;
  errorMessage = '';
  data: any;
  form: any = {
    messageContent: null,
  };

  @Output() redirect:EventEmitter<any> = new EventEmitter();

  constructor(private token: TokenStorageService, private messageService: SendMessageService, private dataService: MessageDataService) { }

  ngOnDestroy() {
    console.log("on destroy msgs " + this.messages[0].messageContent);
    this.dataService.messages = this.messages;
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    console.log("currentUser " + this.currentUser.username)
    this.messageService.getMessagesForUser(this.currentUser.username).subscribe(
      (response: AdChat[]) => {
        this.adMessages = response;
        console.log("prvi elem adid " + this.adMessages[0].messages[0].messageContent );
        this.messages = this.adMessages[0].messages;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
    console.log("ad messages " + this.adMessages + " msgs " + this.messages);
  }


}
