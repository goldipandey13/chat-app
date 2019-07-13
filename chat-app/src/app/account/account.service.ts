import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ErrorService } from 'src/app/shared/error.service';
import { AjaxUtils } from 'src/app/shared/ajax.utils';
import { UrlConstants } from 'src/app/shared/url-constant';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
    private urlConstant: UrlConstants,
    private ajaxUtils: AjaxUtils,
    private errorService: ErrorService
  ) { }

  signUp(user) {
    return this.http
      .post(`${this.urlConstant.SIGN_UP()}`, user, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  signIn(user) {
    return this.http
      .post(`${this.urlConstant.SIGN_IN()}`, user, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  userList() {
    return this.http
      .get(`${this.urlConstant.USER_LIST()}`, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  checkUserToken(user) {
    return this.http
      .post(`${this.urlConstant.IS_LOGGED_IN()}`, { user }, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  logout() {
    return this.http
      .post(`${this.urlConstant.LOGOUT()}`, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }
}
