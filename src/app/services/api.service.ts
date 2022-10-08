import {Injectable} from '@angular/core';
import {ServerService} from './server.service';
import {User, UserType} from '../data/user';
import {GlobalService} from './global.service';
import {global} from '@angular/compiler/src/util';
import {UserInfo, UserInfoType} from '../data/user-info';
import {TimeSpan, TimeSpanType} from '../data/timeSpan';
import {finalize} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(public server: ServerService, private globalService: GlobalService) {
    }

    private setUser(user: User): void {
        this.globalService.updateLogin.next(user);
    }

    getLastUrl(): string {
        return this.server.getUrl();
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
        const cashId = ApiService.getCashId(urlExtension);
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

    private static getCashId(url: string): string {
        const start = url.lastIndexOf('/');
        const end = url.lastIndexOf('.');
        return url.slice(start + 1, end);
    }

    public async getYourself(onlineFirst: boolean = false, id: number = -1): Promise<User> {
        let url = 'get/getYourself.php?';
        if (id >= 0) {
            url += '&userId=' + id;
        }
        try {
            const data = await this.getExOffline(url, onlineFirst);
            const user = new User(JSON.parse(data.toString()) as UserType);
            await this.addUserInfos(user);
            await this.addTimeSpans(user);
            this.setUser(user);
            return user;
        } catch (e) {
            console.log(this.server.getUrl());
            console.log(e);
            throw new Error('#fail#User not found');
        }
    }

    public async getUser(id: number, loadInfos: boolean = false, loadTimeLine: boolean = true): Promise<User> {

        let url = 'get/getUser.php?';
        if (id >= 0) {
            url += '&id=' + id;
        }
        try {
            const data = await this.getEx(url, false, id >= 0);
            const user: User = new User(JSON.parse(data.toString()) as UserType);
            if (loadInfos) {
                await this.addUserInfos(user);
            }
            if (loadTimeLine) {
                await this.addTimeSpans(user);
            }
            return user;
        } catch (e) {
            throw new Error('#fail#User not found');
        }
    }

    public async getPublicUsers(all: boolean = false): Promise<User[]> {

        let url = 'get/getUser.php?';
        if (all) {
            url += '&all=' + true;
        }
        try {
            const users: User[] = [];
            const data = await this.getEx(url);
            const raw = JSON.parse(data.toString()) as UserType[];
            for (const u of raw) {
                users.push(new User(u));
            }
            return users;
        } catch (e) {
            console.log(this.getLastUrl());
            console.log(e);
            throw new Error('#fail#User not found');
        }
    }

    public async addUserInfos(user: User): Promise<void> {
        user.adduserInfo(await this.getUserInfos(user.userId));
    }

    public async getUserInfos(id: number): Promise<UserInfo[]> {

        let url = 'get/getUserInfo.php?';
        url += '&id=' + id;
        try {
            const users: UserInfo[] = [];
            const data = await this.getEx(url);
            const raw = JSON.parse(data.toString()) as UserInfoType[];
            for (const u of raw) {
                users.push(new UserInfo(u));
            }
            return users;
        } catch (e) {
            throw new Error('#fail#User not found');
        }
    }

    public async addTimeSpans(user: User): Promise<void> {
        user.adduserTimespan(await this.getTimeSpans(user.userId));
    }

    public async getTimeSpans(id: number): Promise<TimeSpan[]> {

        let url = 'get/getTimeSpans.php?';
        url += '&id=' + id;
        try {
            const timeSpans: TimeSpan[] = [];
            const data = await this.getEx(url);
            const raw = JSON.parse(data.toString()) as TimeSpanType[];
            for (const u of raw) {
                timeSpans.push(new TimeSpan(u));
            }

            return timeSpans;

        } catch (e) {
            throw new Error('#fail#TimeSpans not found');
        }
    }

    public async login(user: { mail: string, password: string }): Promise<void> {
        const url = 'functions/login.php?'
            + '&password=' + user.password
            + '&mail=' + user.mail;
        const session = await this.getEx(url, false, false);
        this.server.authService.setSession(session);
    }

    public async logout(): Promise<void> {
        await this.server.authService.logout();
        this.globalService.updateLogin.next(null);
    }

    public async register(user: { firstName: string, lastName: string, mail: string, password: string }) {
        const url = 'add/addUser.php?'
            + '&password=' + user.password
            + '&email=' + user.mail
            + '&firstName=' + user.firstName
            + '&lastName=' + user.lastName;
        return await this.getEx(url, false, false);
    }

    public async addUserInfo(userInfo: UserInfo): Promise<string> {
        const url = 'add/addUserInfo.php?'
            + '&name=' + userInfo.name
            + '&value=' + userInfo.value;
        const back = await this.getEx(url);
        console.log(this.getLastUrl());
        return back;
    }
}
