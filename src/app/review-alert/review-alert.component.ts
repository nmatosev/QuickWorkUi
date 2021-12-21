import { Component, Input, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-review-alert',
  templateUrl: './review-alert.component.html',
  styleUrls: ['./review-alert.component.css']
})
export class ReviewAlertComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  @Input() public alert: boolean;
  @Input() public isSuccessful: boolean;


  closeModal() {
     console.log("alert " + this.alert);
     console.log("succ " + this.isSuccessful);
     this.modalService.dismissAll();

  }

}
