import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class AjaxUtils {


    public getHeaderOptions(): any {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Credentials', 'true');
        return headers;
    }

    public getMultiPartHeaderOptions(): any {
        const headers = new HttpHeaders({}); // header should be empty for upload file..
        return headers;
    }

    public extractData(res: Response) {
        const body = res.json();
        return body || {};
    }

    public handleError(error: Response | any) {

        console.log('ajax error from {} having error {}', error.url, error.status + '_' + error.statusText);

        let errMsg: string;

        console.log('error instanceof Response > ', error instanceof Response);

        if (error instanceof Response && error.status !== 404) {
            const body = error.json();

            if (body && body.error && body.error.message) {
                errMsg = body.error.message;
            } else if (body && body.message) {
                errMsg = JSON.stringify(body.message);
            } else {
                errMsg = error.status + '_' + error.statusText;
            }
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        throw (errMsg);
    }


}

