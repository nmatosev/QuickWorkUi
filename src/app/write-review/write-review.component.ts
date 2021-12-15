import {Component, Input, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ReviewService} from "../review.service";

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
  isSuccessful = false;
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
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
    this.closeModal();
  }

  onSaveReview(addForm: any) {

  }
}
