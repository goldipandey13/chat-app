import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AjaxUtils } from '../shared/ajax.utils';
import { ErrorService } from '../shared/error.service';
import { UrlConstants } from '../shared/url-constant';

@Injectable()
export class ChatService {

  constructor(
    private http: HttpClient,
    private urlConstant: UrlConstants,
    private ajaxUtils: AjaxUtils,
    private errorService: ErrorService) { }

  getChatByGroup(group) {
    return this.http
      .get(`${this.urlConstant.CHAT()}/` + group, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  saveChat(data) {
    return this.http
      .post(`${this.urlConstant.CHAT()}`, data, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

  getGroup(selectedMember, loggedInMember) {
    return this.http
      .get(`${this.urlConstant.GET_GROUP()}/${selectedMember}/${loggedInMember}`, this.ajaxUtils.getHeaderOptions())
      .toPromise()
      .then((res: any) => res as any)
      .catch(error => {
        throw this.errorService.processError(error);
      });
  }

}
