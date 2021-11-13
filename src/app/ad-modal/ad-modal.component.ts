import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {County} from "../county";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-ad-modal',
  templateUrl: './ad-modal.component.html',
  styleUrls: ['./ad-modal.component.css']
})
export class AdModalComponent implements OnInit {

  constructor(private userService: ApiService, public dialogRef: MatDialogRef<AdModalComponent>) { }
  public counties: County[];
  content: string;

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
  actionFunction() {
    alert("Ad saved");
    this.closeModal();
  }

  // just close the modal
  closeModal() {
    this.dialogRef.close();
  }



  onSaveAd(addForm: any) {

  }
}
