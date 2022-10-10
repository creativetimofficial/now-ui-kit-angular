import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserAuthService {
    session = '';
    private _server = 'https://api.jan-schuettken.de/wiederhold/';

    constructor(private http: HttpClient, private router: Router, private cookieService: CookieService) {
        // tslint:disable-next-line:triple-equals
        if (this.session == '') {
            this.session = this.getSession();
        }
    }

    get server(): string {
        return this._server;
    }

    authUser(route?: boolean): boolean {
        const isOk = this.checkSessionId();
        if (!isOk) {
            // await this.loginWithToken();
            // isOk = this.checkSessionId();
            // if (!isOk) {
            //   this.forceLogout();
            // }
        }

        if (route && !isOk) {
            this.router.navigate(['/']);
        }
        return isOk;
    }

    async authUserAsync(route?: boolean): Promise<boolean> {
        let isOk = this.checkSessionId();
        if (!isOk) {
            if (!await this.loginWithToken()) {
                await this.forceLogout(true);
                return;
            }
            isOk = this.checkSessionId();
            if (!isOk) {
                await this.forceLogout();
            }
        }

        if (route && !isOk) {
            await this.router.navigate(['/']);
        }
        return isOk;
    }

    checkSessionId(): boolean {
        let isOk;
        if (this.cookieService.check('SessionId')) {
            // tslint:disable-next-line:prefer-const
            let session = this.cookieService.get('SessionId');
            isOk = session.length > 5;
            if (isOk) {
                this.setSession(session);
            }
        } else {
            isOk = false;
        }
        return isOk;
    }

    setLoginToken(token: string): void {
        this.cookieService.set('token', token, {expires: 365, path: '/'}); // expires in one year
    }

    async loginWithToken(): Promise<boolean> {
        const token = this.cookieService.get('token');
        if (token != null && token.length > 5) {
            const url = this._server + 'functions/login.php?token=' + token;
            const data = await this.http.get(url, {responseType: 'text'}).toPromise();
            // console.log(url);
            // console.log(data.toString());
            if (data.startsWith('#fail#')) {
                return false;
            } else {// login true
                const session = data.toString();
                this.setSession(session);
                return true;
            }
        } else {
            return false;
        }
    }

    setSession(session: string): void {
        this.session = session;
        this.cookieService.set('SessionId', session, {expires: 1, path: '/'}); // expires in one day
    }

    getSession(): string {
        if (this.cookieService.check('SessionId')) {
            return this.cookieService.get('SessionId');
        } else {
            return null;
        }
    }

    async checkSession(logout = true): Promise<boolean> {
        const url = this._server + 'get/getYourself.php?session=' + this.getSession();
        const data = await this.http.get(url, {responseType: 'text'}).toPromise();
        if (data.startsWith('#fail#')) {
            if (!await this.loginWithToken()) {
                if (logout) {
                    await this.forceLogout(true);
                }
                return false;
            }
        }
        return true;
    }

    async logout() {
        // this.cookieService.delete('SessionId');
        // this.router.navigate(['/']);
        // console.log('logout');
        if (!await this.loginWithToken()) {
            await this.forceLogout(false);
        }
    }

    async forceLogout(route = true): Promise<void> {
        await localStorage.clear();
        await this.cookieService.deleteAll();
        // this.cookieService.delete('SessionId');
        // this.cookieService.delete('token');
        // this.cookieService.delete('notification');
        if (route) {
            await this.router.navigate(['/login']);
        }
    }
}
