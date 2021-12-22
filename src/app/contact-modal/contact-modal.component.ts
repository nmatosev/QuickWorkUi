import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SendMessageService} from '../send-message.service';
import {MessageAlertComponent} from "../message-alert/message-alert.component";

@Component({
  selector: 'app-contact-modal',
  templateUrl: './contact-modal.component.html',
  styleUrls: ['./contact-modal.component.css']
})
export class ContactModalComponent implements OnInit {

  form: any = {
    messageContent: null,
  };
  isSuccessful:boolean = false;
  alert:boolean = false;
  errorMessage = '';
  username: any;
  @Input() public user: any;
  @Input() public adId: number;
  @Input() public sender: string;

  constructor(private router: ActivatedRoute, private modalService: NgbModal, private sendMessageService: SendMessageService) {
  }



  ngOnInit(): void {
  }


  sendMessage(): void {
    const messageContent = this.form.messageContent;
    console.log("send Message - ad id " + this.adId + " msg " + messageContent + " sender " + this.sender);
    this.sendMessageService.sendMessage(this.adId, messageContent, this.sender).subscribe(
      data => {
       console.log(data);
       this.isSuccessful = true;
       console.log("message sent " + this.adId);
      },
      err => {
       this.errorMessage = err.error.message;
       this.alert = true;
      }
    );
    this.closeModal();
    const dialog = this.modalService.open(MessageAlertComponent);
  }

  // just close the modal
  closeModal() {
    this.modalService.dismissAll();
  }

  onSendMessage(addForm: any) {
    console.log("ad" + this.adId)

  }

}
