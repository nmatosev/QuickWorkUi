import {Component, OnInit} from '@angular/core';
import {User} from '../user';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiService} from '../api.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {AdModalComponent} from '../ad-modal/ad-modal.component';
import {Ad} from "../ad";
import {County} from "../county";
import {ContactModalComponent} from "../contact-modal/contact-modal.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {WriteReviewComponent} from "../write-review/write-review.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  loggedUser?: string;
  public ads: Ad[];
  content: string;
  public ad: Ad;
  public users: User[];
  public counties: County[];
  page: number = 1;

  constructor(private userService: ApiService, private tokenStorageService: TokenStorageService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.getUsers();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {

      const loggedUser = this.tokenStorageService.getUser();

      this.roles = loggedUser.roles;
      console.log("user roles" + JSON.stringify(loggedUser));
      //this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.loggedUser = loggedUser.username;

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

  //checks if this ad is woned by user that is currently logged in
  isLoggedUsersAd(username: string): boolean {
    return this.loggedUser != username;
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

    if (results.length === 0 || !key) {
      console.log(this.userService.getActiveAds())
      this.getAds();
    }
  }

  openContactModal(ad: Ad) {
    const dialog = this.modalService.open(ContactModalComponent);
    console.log("contact modal - ad id " + ad.id + " sender " + this.loggedUser)
    dialog.componentInstance.user = ad.user;
    dialog.componentInstance.adId = ad.id;
    dialog.componentInstance.sender = this.loggedUser;
    dialog.componentInstance.loggedIn = this.isLoggedIn;

  }

  openReviewModal(ad: Ad) {
    const dialog = this.modalService.open(WriteReviewComponent);
    dialog.componentInstance.user = ad.user;
  }

}
