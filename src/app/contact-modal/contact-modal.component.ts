import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  form: any = {
    title: null,
    content: null,
    county: null
  };

  constructor(private router: ActivatedRoute, private modalService: NgbModal) {
  }

  username: any;
  @Input() public user: any;

  ngOnInit(): void {
    console.log("msg from parent " + this.user.username);
    console.log("msg from parent-phone " + this.user.phoneNumber);

  }


  sendMessage(): void {


  }

  // just close the modal
  closeModal() {
    this.modalService.dismissAll();
  }

  onSendMessage(addForm: any) {

  }

}
