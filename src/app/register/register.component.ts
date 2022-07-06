import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {NgxIntlTelInputComponent} from "ngx-intl-tel-input";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, email, phoneNumber, password } = this.form;

    this.authService.register(username, email, phoneNumber, password).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
    this.reloadPage();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
