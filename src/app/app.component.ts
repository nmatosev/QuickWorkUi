import {Component} from '@angular/core';

import {User} from './user';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiService} from './api.service';
import { TokenStorageService } from './_services/token-storage.service';

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

  public users: User[];

  constructor(private userService: ApiService, private tokenStorageService: TokenStorageService) {
  }

  // fetch users on refresh
  ngOnInit() {

    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const loggedUser = this.tokenStorageService.getUser();

      this.roles = loggedUser.roles;
      console.log("user roles"+ JSON.stringify(loggedUser));
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = loggedUser.username;

    }


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

  // adding model programticaly
  public onOpenModel(user: User): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#addEmployeeModal');

    //container.appendChild(button);
    button.click();
  }

}
