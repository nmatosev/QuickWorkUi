import {Injectable} from '@angular/core';
import {LoggedUser} from "../loggedUser";
import {User} from "../user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() {
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    //skužit zašto se user ne spremi,login komponent šteka?
    console.log("sess stg " + window.sessionStorage);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    let loggedUser: LoggedUser = JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
    if (loggedUser) {
      return loggedUser.token;
    }
    return null;
  }

  public saveUser(user: any): void {
    console.log("save usear " + JSON.stringify(user));

    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    console.log("get user sess stg " + JSON.stringify(window.sessionStorage));

    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
