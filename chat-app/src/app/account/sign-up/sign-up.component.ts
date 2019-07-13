import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  registered: boolean;
  user: User;
  confirmPassword: string;
  agreed: boolean;
  showToast: boolean;
  toastMessage: { type: any; text: any; };

  constructor(private accountService: AccountService, private router: Router) {
    this.user = new User();
    this.registered = false;
  }

  showToastElement(typee, message) {
    this.showToast = true;
    this.toastMessage = { type: typee, text: message };
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  iAgree() {
    this.agreed = !this.agreed;
  }

  signUp(isFormValid) {
    if (isFormValid) {
      this.accountService.signUp(this.user).then((res) => {
        if (res.success) {
          this.registered = true;
          setTimeout(() => {
            this.registered = false;
            this.router.navigate([`/`]);
          }, 3000);
        } else {
          this.showToastElement('error', res.errorMsg);
        }
      }).catch((error) => {
        console.log(error);
        this.showToastElement('error', error);
      });
    }
  }

  ngOnInit() {
  }

}
