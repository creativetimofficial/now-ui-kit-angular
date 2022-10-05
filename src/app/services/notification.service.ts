import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    public newNotification: Subject<IAlert> = new Subject<IAlert>();

    constructor() {
    }

    public createSuccessNotification(message: string, strong: string = 'Success', icon: string = 'ui-2_like') {
        this.createNotification({
            id: Math.random(),
            type: 'success',
            strong,
            message,
            icon
        });
    }

    public createInfoNotification(message: string, strong: string = 'Info', icon: string = 'travel_info') {
        this.createNotification({
            id: Math.random(),
            type: 'info',
            strong,
            message,
            icon
        });
    }

    public createWarningNotification(message: string, strong: string = 'Warning', icon: string = 'ui-1_bell-53') {
        this.createNotification({
            id: Math.random(),
            type: 'warning',
            strong,
            message,
            icon
        });
    }

    public createErrorNotification(message: string, strong: string = 'Error', icon: string = 'objects_support-17') {
        this.createNotification({
            id: Math.random(),
            type: 'danger',
            strong,
            message,
            icon
        });
    }

    public createNotification(value: IAlert) {
        value.time = 2000;
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
