import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {User} from '../data/user';

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public updateNavBar: Subject<string> = new Subject<string>();
    public updateLogin: Subject<User> = new Subject<User>();
    public useDefaultFooter: Subject<boolean> = new Subject<boolean>();
    private _user: User = null;

    constructor() {
        this.updateLogin.subscribe(value => this._user = value);
    }

    get user(): User {
        return this._user;
    }
}
