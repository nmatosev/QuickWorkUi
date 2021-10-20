import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Ad} from '../ad';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;

  public ads: Ad[];
  constructor(private userService: ApiService) { }

  ngOnInit() {
    this.userService.getActiveAds().subscribe(
      (response: Ad[]) => {
        console.log("ads" + this.ads);
        this.ads = response;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
