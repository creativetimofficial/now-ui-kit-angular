import {Injectable} from '@angular/core';
import {ServerService} from './server.service';
import {User, UserRoleType, UserType} from '../data/user';
import {GlobalService} from './global.service';
import {UserInfo, UserInfoType} from '../data/user-info';
import {TimeSpan, TimeSpanTypes} from '../data/timeSpan';
import {RoomData, TimeSpanUserType} from '../data/room-data';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {


    constructor(public server: ServerService, private globalService: GlobalService) {
    }

    private setUser(user: User): void {
        this.globalService.updateLogin.next(user);
        this.server.authService.setLoginToken(user.loginToken);
    }

    async getContent(url: string): Promise<string> {
        return await this.server.getResponseRaw(url);
    }

    getLastUrl(): string {
        return this.server.getUrl();
    }

    async get(urlExtension: string, logout = false, setSession: boolean = true): Promise<string> {
        return await this.server.getResponse(urlExtension, logout, setSession);
    }

    async getEx(urlExtension: string, logout = false, setSession: boolean = true): Promise<string> {
        const data = await this.get(urlExtension, logout, setSession);
        if (data != null) {
            if (data.startsWith('#fail#')) {
                throw new Error(data.toString());
            }
            return data.toString();
        } else {
            throw new Error('#fail#data is null');
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
                localStorage.setItem(cashId, data);
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
            const data = await this.getExOffline(url, !onlineFirst);
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

    public async getRoomData(type: TimeSpanTypes): Promise<RoomData[]> {

        const url = 'get/getTimeSpans.php?'
            + '&type=' + type.toString();

        try {
            const roomData: RoomData[] = [];
            const data = await this.getEx(url);
            const raw = JSON.parse(data.toString()) as TimeSpanUserType[];
            for (const u of raw) {
                roomData.push(new RoomData(new User(u), new TimeSpan(u)));
            }

            return roomData;

        } catch (e) {
            // console.log(e);
            // console.log(this.server.createSessionUrl(url));
            throw new Error('#fail#TimeSpans not found');
        }
    }

    public async getTimeSpans(id: number = -1, users: User[] = []): Promise<TimeSpan[]> {

        let url = 'get/getTimeSpans.php?';
        if (id > 0) {
            url += '&id=' + id;
        }
        try {
            const timeSpans: TimeSpan[] = [];
            const data = await this.getEx(url);
            const raw = JSON.parse(data.toString()) as TimeSpanUserType[];
            for (const u of raw) {
                timeSpans.push(new TimeSpan(u));
                users.push(new User(u));
            }

            return timeSpans;

        } catch (e) {
            throw new Error('#fail#TimeSpans not found');
        }
    }

    public async login(user: { mail: string, password: string }): Promise<void> {
        const url = 'functions/login.php?'
            + '&password=' + user.password
            + '&mail=' + user.mail
            + '&version=' + environment.version;
        const session = await this.getEx(url, false, false);
        this.server.authService.setSession(session);
    }

    public async logout(): Promise<void> {
        await this.server.authService.logout();
        this.globalService.updateLogin.next(null);
        await this.server.authService.forceLogout();

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
        return await this.getEx(url);
    }

    public async addTimeSpan(timeSpan: TimeSpan): Promise<string> {
        let url = 'add/addTimeSpan.php?';
        if (timeSpan.type != null && timeSpan.type.length > 0) {
            url += '&type=' + timeSpan.type;
        }
        if (timeSpan.date != null && timeSpan.date.length > 0) {
            url += '&date=' + timeSpan.date;
        }
        if (timeSpan.endDate != null && timeSpan.endDate.length > 0) {
            url += '&endDate=' + timeSpan.endDate;
        }
        if (timeSpan.title != null && timeSpan.title.length > 0) {
            url += '&title=' + timeSpan.title;
        }
        if (timeSpan.description != null && timeSpan.description.length > 0) {
            url += '&description=' + timeSpan.description;
        }
        return await this.getEx(url);
    }

    public async resetPassword(mail: string) {
        const url = 'functions/forgotPassword.php?'
            + 'mail=' + mail;
        return await this.getEx(url, false, false);
    }

    async requestRoom(room: RoomData, application: string): Promise<string> {
        const url = 'mail/requestRoom.php?'
            + '&roomOfferId=' + room.timeSpan.timeSpanId
            + '&application=' + application;
        return await this.getEx(url);
    }

    async respondToRoomRequest(room: RoomData, application: string): Promise<string> {
        const url = 'mail/requestRoom.php?'
            + '&roomOfferId=' + room.timeSpan.timeSpanId
            + '&application=' + application;
        return await this.getEx(url);
    }

    async askAQuestion(mail: string, name: string, description: string): Promise<string> {
        const url = 'mail/requestInformation.php?'
            + '&mail=' + mail
            + '&description=' + description
            + '&name=' + name;
        return await this.getEx(url);
    }

    async updateUserRole(role: UserRoleType, userId: number = -1): Promise<string> {
        let url = 'update/updateUserRole.php?'
            + '&role=' + role.toString();
        if (userId > 0) {
            url += '&userId=' + userId;
        }
        return await this.getEx(url);
    }
}
