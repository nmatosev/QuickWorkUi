import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ad-modal',
  templateUrl: './ad-modal.component.html',
  styleUrls: ['./ad-modal.component.css']
})
export class AdModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdModalComponent>) { }

  ngOnInit() {
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
