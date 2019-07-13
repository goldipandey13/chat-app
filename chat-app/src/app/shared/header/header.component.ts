import { Component, OnInit, TemplateRef } from '@angular/core';
import { AccountService } from 'src/app/account/account.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import * as io from 'socket.io-client';

import { environment } from 'src/environments/environment';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showToast: boolean;
  dialogRef: MatDialogRef<any, any>;
  toastMessage: { type: any; text: any; };
  socket = io(environment.serverUrl);

  constructor(
    public dialog: MatDialog,
    private commonService: CommonService,
    private accountService: AccountService,
    private router: Router, ) {
    this.commonService.isloggedInChanges.subscribe((value: any) => {
      if (value) {
        this.isLoggedIn = true;
        this.loggedInUser = value.name;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  showToastElement(typee, message) {
    this.showToast = true;
    this.toastMessage = { type: typee, text: message };
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  openDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.dialog.open(templateRef, { disableClose: true, width: '400px' });
  }

  navigateToChatList() {
    if (this.isLoggedIn) {
      this.router.navigate(['/chat-list']);
    } else {
      this.showToastElement('error', 'Please login to the application first.');
    }
  }

  logout() {
    this.accountService.logout().then((res) => {
      if (res.success) {
        localStorage.clear();
        this.commonService.isloggedInChanges.next(false);
        this.router.navigate(['/']);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

}
