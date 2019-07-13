import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class UrlConstants {

    private serverUrl: string = environment.serverUrl;

    public SIGN_UP(): string {
        return `${this.serverUrl}/user/register`;
    }

    public SIGN_IN(): string {
        return `${this.serverUrl}/user/login`;
    }

    public IS_LOGGED_IN(): string {
        return `${this.serverUrl}/user/tokenCheck`;
    }

    public USER_LIST(): string {
        return `${this.serverUrl}/user/usersList`;
    }

    public CHAT(): string {
        return `${this.serverUrl}/chat`;
    }

    public GET_GROUP(): string {
        return `${this.serverUrl}/chat/findGroup`;
    }

    public LOGOUT(): string {
        return `${this.serverUrl}/user/logout`;
    }

}
