export enum UserInfoTypes {
    role = 'role',
    description = 'description',
    instagram = 'instagram',
    facebook = 'facebook',
    twitter = 'twitter',
    phone = 'phone',
    publicMail = 'publicMail',
    studies = 'studies',
}

export interface UserInfoType {
    userInfoId: number;
    userId: number;
    name: UserInfoTypes;
    value: string;
    date: string;
}

export class UserInfo implements UserInfoType {
    userInfoId: number = -1;
    userId: number = -1;
    name: UserInfoTypes = null;
    value: string = null;
    date: string = null;

    constructor(userType?: UserInfoType) {
        if (userType != null) {
            for (const prop in userType) {
                this[prop] = userType[prop];
            }
        }
    }
}

