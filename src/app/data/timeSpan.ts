export enum TimeSpanTypes {
    stay = 'stay',
    searching = 'searching',
}

export interface TimeSpanType {
    timespanId: number;
    userId: number;
    date: string;
    type: TimeSpanTypes;
    title: string;
    description: string;
}

export class TimeSpan implements TimeSpanType {
    timespanId: number = -1;
    userId: number = -1;
    date: string = null;
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
