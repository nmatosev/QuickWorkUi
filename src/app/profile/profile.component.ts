import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    console.log("user prof compon"+ JSON.stringify(this.token.getUser()))
    this.currentUser = this.token.getUser();
  }
}
