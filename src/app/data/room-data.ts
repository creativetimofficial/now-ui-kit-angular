import {User, UserType} from './user';
import {TimeSpan, TimeSpanType} from './timeSpan';

export interface TimeSpanUserType extends TimeSpanType, UserType {
}

export class RoomData {
    user: User;
    timeSpan: TimeSpan;


    constructor(user: User, timeSpan: TimeSpan) {
        this.user = user;
        this.timeSpan = timeSpan;
    }
}
