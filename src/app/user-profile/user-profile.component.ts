import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  username: any;
  title: any;

  constructor(private router: ActivatedRoute) { }
  ngOnInit(): void {
    //poslat id pa po id-u izvadit iz mape
    console.log("user is " + JSON.stringify(this.router.snapshot.paramMap))
    this.username = this.router.snapshot.paramMap.get('username');
    //this.title = this.router.snapshot.paramMap.get('title');
  }
}
