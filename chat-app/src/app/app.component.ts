import { Component, OnDestroy } from '@angular/core';
import { AccountService } from './account/account.service';
import { CommonService } from './shared/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'chat-app';

  constructor(private acountService: AccountService, private commonService: CommonService, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.acountService.checkUserToken(user).then((res) => {
        if (res.success) {
          this.commonService.isloggedInChanges.next(res.user);
          this.router.navigate(['/chat-list']);
        }
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy() {
    this.commonService.isloggedInChanges.next(false);
    localStorage.clear();
  }
}
