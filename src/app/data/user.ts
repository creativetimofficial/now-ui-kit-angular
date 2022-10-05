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
    role: string;
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
    role: string = '';

    constructor(userType?: UserType) {
        if (userType != null) {
            for (const prop in userType) {
                this[prop] = userType[prop];
            }
        }
    }

    get getImgUrl(): string {
        if (this.imgUrlSmall != null && this.imgUrlSmall.length > 5) {
            return this.imgUrlSmall;
        } else {
            return this.imgUrl;
        }
    }
}

