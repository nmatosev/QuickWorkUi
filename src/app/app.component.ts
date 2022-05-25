import {Component} from '@angular/core';

import {User} from './user';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiService} from './api.service';
import {TokenStorageService} from './_services/token-storage.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AdModalComponent} from './ad-modal/ad-modal.component';
import {County} from "./county";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfilePicture} from "./profile-picture";
import { DomSanitizer } from '@angular/platform-browser';

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
  content: string;
  public users: User[];
  public counties: County[];
  page: number = 1;
  public profilePic: ProfilePicture;
  public profilePicture64: string;

  constructor(private userService: ApiService, private tokenStorageService: TokenStorageService, public matDialog: MatDialog, private modalService: NgbModal,
              private _sanitizer: DomSanitizer) {
  }

  // fetch users on refresh
  ngOnInit() {

    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const loggedUser = this.tokenStorageService.getUser();
      this.roles = loggedUser.roles;
      this.username = loggedUser.username;
      this.userService.getImage(loggedUser.username).subscribe(
        (response: ProfilePicture) => {
          this.profilePic = response;
          this.profilePicture64 = this.profilePic.encodedPicture;
        }
      )
    }

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


  openCreateAdModal() {
    const dialog = this.modalService.open(AdModalComponent);
  }


  openLoginModal() {
    const dialog = this.modalService.open(LoginComponent);
  }

  openRegisterModal() {
    const dialog = this.modalService.open(RegisterComponent);
  }
}
