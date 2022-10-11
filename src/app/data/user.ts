import {UserInfoType, UserInfoTypes} from './user-info';
import {TimeSpanType, TimeSpanTypes} from './timeSpan';

export enum UserRoleType {
    resident = 'resident',
    roomer = 'roomer',
    alumni = 'alumni',
    staff = 'staff',
    unknown = 'unknown'
}

export interface UserType {
    userId: number;
    mail: string;
    firstName: string;
    lastName: string;
    power: number;
    loginToken: string;
    imgUrl: string;
    imgUrlSmall: string;
    googleId: number;
    confirmed: number;
    role: UserRoleType;
    publicProfile: number;
    instagram: string;
    facebook: string;
    twitter: string;
    phone: string;
    publicMail: string;
    studies: string;
    userInfos: UserInfoType[];
    timeSpans: TimeSpanType[];
}

export class User implements UserType {
    userId: number = -1;
    mail: string = '';
    firstName: string = '';
    lastName: string = '';
    power: number = 0;
    loginToken: string = '';
    imgUrl: string = '';
    imgUrlSmall: string = '';
    googleId: number = -1;
    confirmed: number = -1;
    role: UserRoleType = UserRoleType.unknown;
    userInfos: UserInfoType[] = [];
    instagram: string;
    facebook: string;
    twitter: string;
    phone: string;
    publicMail: string;
    studies: string;
    publicProfile: number = 0;
    private _description: string = null;
    timeSpans: TimeSpanType[] = [];


    constructor(userType?: UserType) {
        if (userType != null) {
            for (const prop in userType) {
                this[prop] = userType[prop];
            }
        }
    }

    clone(): User {
        return new User(this);
    }

    equals(user: User): boolean {
        return JSON.stringify(user) === JSON.stringify(this);
    }

    getMilestones(): TimeSpanType[] {
        return this.timeSpans.filter(value => value.type === TimeSpanTypes.milestone);
    }

    adduserTimespan(timeSpans: TimeSpanType[]): void {
        this.timeSpans = timeSpans;
    }

    adduserInfo(userInfos: UserInfoType[]): void {
        this.userInfos = userInfos;
        for (const ui of this.userInfos) {
            switch (ui.name) {
                case UserInfoTypes.instagram.toLocaleString():
                    this.instagram = ui.value;
                    break;
                case UserInfoTypes.facebook.toLocaleString():
                    this.facebook = ui.value;
                    break;
                case UserInfoTypes.twitter.toLocaleString():
                    this.twitter = ui.value;
                    break;
                case UserInfoTypes.phone.toLocaleString():
                    this.phone = ui.value;
                    break;
                case UserInfoTypes.publicMail.toLocaleString():
                    this.publicMail = ui.value;
                    break;
                case UserInfoTypes.studies.toLocaleString():
                    this.studies = ui.value;
                    break;
            }
        }
    }

    capitalizeFirstLetter(string): string {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    get hasImg(): boolean {
        return this.imgUrlSmall != null || this.imgUrl != null;
    }

    get getImgUrl(): string {
        if (this.imgUrlSmall != null && this.imgUrlSmall.length > 5) {
            return this.imgUrlSmall;
        } else {
            return this.imgUrl;
        }
    }

    get roles(): string {
        let back = this.capitalizeFirstLetter(this.role.toString());
        for (const ui of this.userInfos) {
            if (ui.name === 'role') {
                back += ', ' + ui.value;
            }
        }
        return back;
    }

    get getDescription(): string {
        if (this._description == null) {
            let back = '';
            for (const ui of this.userInfos) {
                if (ui.name === 'description') {
                    back += ui.value;
                }
            }
            if (back.length > 0) {
                this._description = back;
            }
            return back;
        } else {
            return this._description;
        }
    }


    get publicProfileInt(): boolean {
        return this.publicProfile === 1;
    }

    set publicProfileInt(value: boolean) {
        this.publicProfile = value ? 1 : 0;
    }

    get isConfirmed() {
        // tslint:disable-next-line:triple-equals
        return this.confirmed == 1;
    }

    get isRoleUnknown() {
        return this.role === UserRoleType.unknown;
    }

    get isResident() {
        return this.role === UserRoleType.resident || this.role === UserRoleType.alumni;
    }
}

