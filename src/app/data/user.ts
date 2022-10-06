import {UserInfoType} from './user-info';

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
    publicProfile: number;
    instagram: string;
    facebook: string;
    twitter: string;
    phone: string;
    publicMail: string;
    studies: string;
    userInfos: UserInfoType[];
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
    publicProfile: number = 0;
    userInfos: UserInfoType[] = [];
    instagram: string;
    facebook: string;
    twitter: string;
    phone: string;
    publicMail: string;
    studies: string;
    private _description: string = null;

    constructor(userType?: UserType) {
        if (userType != null) {
            for (const prop in userType) {
                this[prop] = userType[prop];
            }
        }
    }

    adduserInfo(userInfos: UserInfoType[]): void {
        this.userInfos = userInfos;
        for (const ui of this.userInfos) {
            switch (ui.name) {
                case 'instagram':
                    this.instagram = ui.value;
                    break;
                case 'facebook':
                    this.facebook = ui.value;
                    break;
                case 'twitter':
                    this.twitter = ui.value;
                    break;
                case 'phone':
                    this.phone = ui.value;
                    break;
                case 'publicMail':
                    this.publicMail = ui.value;
                    break;
                case 'studies':
                    this.studies = ui.value;
                    break;
            }
        }
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
        let back = '';
        for (const ui of this.userInfos) {
            if (ui.name === 'role') {
                back += ui.value + ', ';
            }
        }
        if (back.length > 0) {
            back = back.slice(0, back.length - 2);
        }
        return back;
    }

    get description(): string {
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
}

