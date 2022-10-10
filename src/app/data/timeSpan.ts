import {UserType} from './user';

export enum TimeSpanTypes {
    offer = 'offer',
    searching = 'searching',
    milestone = 'milestone',
    unknown = 'unknown'
}

export interface TimeSpanType {
    timeSpanId: number;
    userId: number;
    date: string;
    endDate: string;
    type: TimeSpanTypes;
    title: string;
    description: string;
}

export class TimeSpan implements TimeSpanType {
    timeSpanId: number = -1;
    userId: number = -1;
    date: string = null;
    endDate: string = null;
    type: TimeSpanTypes = null;
    title: string = null;
    description: string = null;

    constructor(userType?: TimeSpanType) {
        if (userType != null) {
            for (const prop in userType) {
                this[prop] = userType[prop];
            }
        }
    }
}
