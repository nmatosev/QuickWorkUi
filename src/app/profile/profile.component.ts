import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';
import { SendMessageService } from '../send-message.service';
import { Message } from "../message";
import { AdMessage } from "../ad-message";
import Pusher from 'pusher-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  errorMessage = '';
  data: any

  form: any = {
    messageContent: null,
  };

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    console.log("currentUser " + this.currentUser.username)
  }

}
