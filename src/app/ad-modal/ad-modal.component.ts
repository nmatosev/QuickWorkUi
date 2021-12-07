import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {County} from "../county";
import {ApiService} from "../api.service";
import {AdService} from "../_services/ad.service";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-ad-modal',
  templateUrl: './ad-modal.component.html',
  styleUrls: ['./ad-modal.component.css']
})
export class AdModalComponent implements OnInit {

  form: any = {
    title: null,
    content: null,
    county: null
  };
  errorMessage = '';

  constructor(private userService: ApiService, public dialogRef: MatDialogRef<AdModalComponent>, private adService: AdService,
              private tokenStorageService: TokenStorageService) {
  }

  public counties: County[];
  content: string;
  selectedCounty: County;

  ngOnInit() {

    this.userService.getCounties().subscribe(
      (response: County[]) => {
        this.counties = response;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    )
  }

  // Implement call to save ad api
  submitAd(): void {
    console.log("user ad modal" + this.tokenStorageService.getUser())

    let userId = this.tokenStorageService.getUser().id;
    const {title, content} = this.form;
    this.adService.saveAd(title, content, this.selectedCounty.id, userId).subscribe(
      data => {
        console.log("submit new ad content" + content)
      },
      err => {
        this.errorMessage = err.error.message;
      });
    this.closeModal();
  }

  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }


  onSaveAd(addForm: any) {

  }
}
