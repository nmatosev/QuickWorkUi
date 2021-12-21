import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReviewService} from "../review.service";
import {ReviewAlertComponent} from "../review-alert/review-alert.component";

@Component({
  selector: 'app-write-review',
  templateUrl: './write-review.component.html',
  styleUrls: ['./write-review.component.css']
})


export class WriteReviewComponent implements OnInit {

  form: any = {
    content: null,
    rating: null
  };
  isSuccessful:boolean = false;
  alert:boolean = false;
  errorMessage = '';

  @Input() public user: any;

  constructor(private modalService: NgbModal, private reviewService: ReviewService) {
  }

  ngOnInit(): void {
  }


  // just close the modal
  closeModal() {
    this.modalService.dismissAll();

  }


  submitReview(): void {
    const {content, rating} = this.form;
    this.reviewService.sendReview("-", this.user.username, content, rating).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        console.log("succ " + this.isSuccessful);
      },
      err => {
        this.errorMessage = err.error.message;
        this.alert = true;
        console.log("alert " + this.alert + " errorMessage " + this.errorMessage);

      }
    );
    this.closeModal();
    const dialog = this.modalService.open(ReviewAlertComponent);
    dialog.componentInstance.isSuccessful = this.isSuccessful;
    dialog.componentInstance.alert = this.alert;
  }

  onSaveReview(addForm: any) {
  }


}
