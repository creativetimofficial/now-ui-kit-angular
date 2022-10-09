import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public newNotification: Subject<IAlert> = new Subject<IAlert>();

    constructor() {
    }

    public createSuccessNotification(message: string, time: number = null, strong: string = 'Success', icon: string = 'ui-2_like') {
        this.createNotification({
            id: Math.random(),
            type: 'success',
            strong,
            message,
            icon,
            time
        });
    }

    public createInfoNotification(message: string, time: number = null, strong: string = 'Info', icon: string = 'travel_info') {
        this.createNotification({
            id: Math.random(),
            type: 'info',
            strong,
            message,
            icon,
            time
        });
    }

    public createWarningNotification(message: string, time: number = null, strong: string = 'Warning', icon: string = 'ui-1_bell-53') {
        this.createNotification({
            id: Math.random(),
            type: 'warning',
            strong,
            message,
            icon,
            time
        });
    }

    public createErrorNotification(message: string, time: number = -1, strong: string = 'Error', icon: string = 'objects_support-17') {
        this.createNotification({
            id: Math.random(),
            type: 'danger',
            strong,
            message,
            icon,
            time
        });
    }

    public createNotification(value: IAlert) {
        if (value.time == null) {
            value.time = 3000;
        }
        this.newNotification.next(value);
        // this.alerts.push({
        //     id: 1,
        //     type: 'success',
        //     strong: 'Well done!',
        //     message: 'You successfully read this important alert message.',
        //     icon: 'ui-2_like'
        // }, {
        //     id: 2,
        //     strong: 'Heads up!',
        //     type: 'info',
        //     message: 'This is an info alert',
        //     icon: 'travel_info'
        // }, {
        //     id: 3,
        //     type: 'warning',
        //     strong: 'Warning!',
        //     message: 'This is a warning alert',
        //     icon: 'ui-1_bell-53'
        // }, {
        //     id: 4,
        //     type: 'danger',
        //     strong: 'Oh snap!',
        //     message: 'This is a danger alert',
        //     icon: 'objects_support-17'
        // });
    }
}

export interface IAlert {
    id: number;
    type: string;
    strong?: string;
    message: string;
    icon?: string;
    time?: number;
}
