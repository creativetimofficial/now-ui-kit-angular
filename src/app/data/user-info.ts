export interface UserInfoType {
    userInfoId: number;
    userId: number;
    name: string;
    value: string;
    date: string;
}

export class UserInfo implements UserInfoType {
    userInfoId: number = -1;
    userId: number = -1;
    name: string = null;
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

