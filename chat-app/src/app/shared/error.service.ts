import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class ErrorService {

    constructor(private router: Router) { }

    goToPermissionDeniedPage(): void {
        this.router.navigateByUrl('/permission-denied').then(() => { });
    }

    goToPageNotFoundPage(): void {
        this.router.navigateByUrl('/page-not-found').then(() => { });
    }

    sendToLoginPage(url) {
        this.router.ngOnDestroy();
        this.router.navigateByUrl(url).then(() => { });
    }

    processError(error) {
        let errMsg = '';
        if (!error.status) {
            errMsg = 'Please check your internet connection, and try again';
        } else if (error.status === 401) {
            errMsg = 'Redirecting to login Page...';
            this.sendToLoginPage(window.parent.location.href);
        } else if (error.status === 403) {
            errMsg = 'Access Denied';
            this.goToPermissionDeniedPage();
        } else if (error.status === 404) {
            errMsg = 'Page not found';
            this.goToPageNotFoundPage();
        } else {
            try {
                const body = error || {};
                errMsg = body.error && body.error.message ? body.error.message : body.message ? body.message : '';
            } catch (e) {
                console.log('error in parsing');
            }
        }

        return errMsg || 'Server error. Try again';
    }

    processFileUploadError(error) {
        let err = '';

        if (!error.status) {
            err = 'No internet connection';
        } else {
            try {
                const body = error.json() || {};
                err = body.message ? body.message : body.error && body.error.message ? body.error.message : '';
                if (err.indexOf('FileUploadBase$SizeLimitExceededException') > -1) {
                    err = 'File size exceeded';
                }
            } catch (e) {
                console.log('error in parsing');
            }
        }
        return err || 'Server error. Try again';
    }

}
