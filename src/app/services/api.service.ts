import {Injectable} from '@angular/core';
import {ServerService} from './server.service';
import {User, UserType} from '../data/user';
import {GlobalService} from './global.service';
import {global} from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(private server: ServerService, private globalService: GlobalService) {
    }

    private setUser(user: User): void {
        this.globalService.updateLogin.next(user);
    }

    async get(urlExtension: string, logout = false, setSession: boolean = true): Promise<string> {
        return this.server.getResponse(urlExtension, logout, setSession);
    }

    async getEx(urlExtension: string, logout = false, setSession: boolean = true): Promise<string> {
        const data = await this.get(urlExtension, logout, setSession);
        if (data != null) {
            if (data.startsWith('#fail#')) {
                throw new Error(data.toString());
            }
            return data.toString();
        } else {
            return '#fail#';
        }
    }

    async getExOffline(urlExtension: string, offline: boolean = false, logout = false, setSession: boolean = true): Promise<string> {
        const cashId = this.getCashId(urlExtension);
        console.log(cashId);
        if (!offline) {
            const data = await this.get(urlExtension, logout, setSession);
            if (data != null) {
                if (data.startsWith('#fail#')) {
                    throw new Error(data.toString());
                }
                return data.toString();
            } else {
                return '#fail#';
            }
        } else {
            let data: string = localStorage.getItem(cashId);
            if (data == null || data.length <= 1) {

                data = await this.get(urlExtension, logout, setSession);
                if (data != null) {
                    if (data.startsWith('#fail#')) {
                        throw new Error(data.toString());
                    }
                } else {
                    return '#fail#';
                }

                localStorage.setItem(cashId, data);
                return data;
            } else {
                return data;
            }
        }
    }

    private getCashId(url: string): string {
        const start = url.lastIndexOf('/');
        const end = url.lastIndexOf('.');
        return url.slice(start + 1, end);
    }

    public async getYourself(id: number = -1): Promise<User> {
        let url = 'get/getYourself.php?';
        if (id >= 0) {
            url += '&userId=' + id;
        }
        try {
            const data = await this.getExOffline(url, true);
            const user = new User(JSON.parse(data.toString()) as UserType);
            this.setUser(user);
            return user;
        } catch (e) {
            console.log(this.server.getUrl());
            console.log(e);
            throw new Error('#fail#User not found');
        }
    }

    public async getUser(id: number): Promise<User> {

        let url = 'get/getUser.php?';
        if (id >= 0) {
            url += '&id=' + id;
        }
        try {
            const data = await this.getEx(url, true);
            return new User(JSON.parse(data.toString()) as UserType);
        } catch (e) {
            throw new Error('#fail#User not found');
        }
    }

    public async login(user: { mail: string, password: string }): Promise<void> {
        const url = 'functions/login.php?'
            + '&password=' + user.password
            + '&mail=' + user.mail;
        const session = await this.getEx(url, false, false);
        this.server.authService.setSession(session);
    }

    public async register(user: { firstName: string, lastName: string, mail: string, password: string }) {
        const url = 'add/addUser.php?'
            + '&password=' + user.password
            + '&email=' + user.mail
            + '&firstName=' + user.firstName
            + '&lastName=' + user.lastName;
        return await this.getEx(url, false, false);
    }
}
