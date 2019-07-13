import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  user: User;
  loggedIn: boolean;
  showToast: boolean;
  toastMessage: { type: any; text: any; };

  constructor(private accountService: AccountService, private router: Router, private commonService: CommonService) {
    this.user = new User();
    this.loggedIn = false;
  }

  ngOnInit() {
  }

  showToastElement(typee, message) {
    this.showToast = true;
    this.toastMessage = { type: typee, text: message };
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  signIn(isFormValid) {
    if (isFormValid) {
      this.accountService.signIn(this.user).then((res) => {
        if (res.success) {
          this.loggedIn = true;
          this.commonService.isloggedInChanges.next(res.user);
          localStorage.setItem('user', JSON.stringify(res.user));
          setTimeout(() => {
            this.loggedIn = false;
            this.router.navigate([`/chat-list`]);
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

}
