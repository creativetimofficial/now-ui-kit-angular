import {Injectable, isDevMode} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserAuthService} from './user-auth-service.service';

@Injectable({
    providedIn: 'root'
})
export class ServerService {

    private server = this.authService.server;
    private lastUrl: string;
    private lastUrls: string[] = [];
    private serverRequests = 0;


    constructor(private http: HttpClient, public authService: UserAuthService) {
    }

    protected async getSuccess(urlExtension: string): Promise<boolean> {
        const data = await this.getResponse(urlExtension);
        return !data.startsWith('#fail#');
    }

    createSessionUrl(urlExtension: string, setSession: boolean = true): string {
        let url = this.server + urlExtension;
        if (setSession) {
            url = this.server + urlExtension.replace('?', '?session=' + this.getSession());
        }
        return url;
    }

    async getResponseRaw(url: string): Promise<string> {
        return await this.http.post(url, null, {responseType: 'text'}).toPromise() as string;
    }

    async getResponse(urlExtension: string, logout = false, setSession: boolean = true): Promise<string> {
        if (isDevMode() && false) {
            console.log(this.serverRequests++);
        }
        const untouchedUrl = urlExtension;
        let url = this.createSessionUrl(urlExtension, setSession);
        this.lastUrl = url;
        this.lastUrls.push(this.lastUrl);
        let data: string = await this.getResponseRaw(url);
        // console.log(url);
        // console.log(data);
        if (data.toString().startsWith('#fail#session error')) {
            if (await this.authService.loginWithToken()) {
                if (setSession) {
                    url = this.server + untouchedUrl.replace('?', '?session=' + this.getSession());
                } else {
                    url = this.server + untouchedUrl;
                }
                this.lastUrl = url;
                this.lastUrls.push(this.lastUrl);
                data = await this.http.post(url, null, {responseType: 'text'}).toPromise() as string;
                // console.log(data);
                return data;
            } else {
                console.log('Login not possible');
                return null;
                // throw new Error();
            }
        }
        if (logout) {
            if (data.startsWith('#fail#')) {
                await this.authService.logout();
                return null;
            }
        }
        return data;
    }

    getSession(): string {
        return this.authService.getSession();
    }

    getUrl(): string {
        return this.lastUrl;
    }

    getUrls(): string[] {
        return this.lastUrls;
    }

    // Returns an observable
    upload(url: string, file): Observable<any> {

        // Create form data
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append('file', file, file.name);

        // Make http post request over api
        // with formData as req

        this.lastUrl = url = this.createSessionUrl(url);
        console.log(url);
        return this.http.post(url, formData, {responseType: 'text'});
    }
}
