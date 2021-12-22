import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { SendMessageService } from '../send-message.service';
import { Message } from "../message";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  public messages: Message[];
  content: string;

  constructor(private token: TokenStorageService, private messageService: SendMessageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();

    this.messageService.getMessagesForUser().subscribe(
      (response: Message[]) => {
        this.messages = response;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
