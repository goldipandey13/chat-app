import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatDialogModule, MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { SignInComponent } from './account/sign-in/sign-in.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AjaxUtils } from './shared/ajax.utils';
import { ErrorService } from './shared/error.service';
import { UrlConstants } from './shared/url-constant';
import { HeaderComponent } from './shared/header/header.component';
import { AccountService } from './account/account.service';
import { CommonService } from './shared/common.service';
import { ToastMessageComponent } from './shared/toast-message/toast-message.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    ChatComponent,
    HeaderComponent,
    ToastMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  providers: [AjaxUtils, ErrorService, UrlConstants, AccountService, CommonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
