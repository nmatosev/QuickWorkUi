import {Component} from '@angular/core';

import {User} from './user';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiService} from './api.service';
import {TokenStorageService} from './_services/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AdModalComponent} from './ad-modal/ad-modal.component';
import {Ad} from "./ad";
import {County} from "./county";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quickworkui';
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username?: string;
  public ads: Ad[];
  content: string;

  public users: User[];
  public counties: County[];


  constructor(private userService: ApiService, private tokenStorageService: TokenStorageService, public matDialog: MatDialog) {
  }

  // fetch users on refresh
  ngOnInit() {

    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const loggedUser = this.tokenStorageService.getUser();

      this.roles = loggedUser.roles;
      console.log("user roles" + JSON.stringify(loggedUser));
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = loggedUser.username;

    }

    this.userService.getActiveAds().subscribe(
      (response: Ad[]) => {
        this.ads = response;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );

    this.userService.getCounties().subscribe(
      (response: County[]) => {
        this.counties = response;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )

  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public getAds(): void {
    this.userService.getActiveAds().subscribe(
      (response: Ad[]) => {
        this.ads = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchAds(key: string): void {

    const results: Ad[] = [];
    for (const ad of this.ads) {
      if (ad.content.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        ad.title.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(ad);
      }
    }

    this.ads = results;

    if(results.length === 0 || !key) {
      console.log(this.userService.getActiveAds())
      this.getAds();
    }
  }


  openModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "350px";
    dialogConfig.width = "600px";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(AdModalComponent, dialogConfig);
  }


}
