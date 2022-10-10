import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {User} from '../../data/user';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../services/notification.service';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-basic-page',
    template: `
        <p>
            basic-auth-page works!
        </p>
    `,
    styles: []
})
export class BasicPageComponent implements OnInit, OnDestroy {
    user: User = null;
    private _busy: boolean = false;
    protected subscriptions: Subscription[] = [];

    constructor(protected global: GlobalService, protected notificationService: NotificationService) {
    }

    ngOnInit(): void {
        // console.log('ngOnInit', this.constructor.name);
        this.global.updateNavBar.next(this.constructor.name);
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => {
            subscription.unsubscribe();
        });
        // console.log('ngOnDestroy', this.constructor.name);
        this.global.updateNavBar.next(null);
    }

    get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    setBusy() {
        this.busy = true;
    }

    resetBusy() {
        this.busy = false;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    replaceAll(value: string, search: string, replace: string): string {
        return value.replace(new RegExp(search, 'g'), replace);
    }

    comingSoon() {
        this.notificationService.createInfoNotification('Coming soon');
    }

    catchError(reason: any) {
        console.log(reason);
        this.notificationService.createErrorNotification(reason);
    }

    formatDate(date: string, format: string): string {
        const datePipe = new DatePipe(environment.language);
        return datePipe.transform(date, format);
    }

    toDate(mysqlTimeStamp: string): Date {
        // example MySQL DATETIME
        // const dateTime = '2017-02-04 11:23:54';

        // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
        const dateTimeParts = mysqlTimeStamp.split(/[- :]/);
        // @ts-ignore
        dateTimeParts[1]--; // monthIndex begins with 0 for January and ends with 11 for December so we need to decrement by one

        // @ts-ignore
        return new Date(...dateTimeParts); // our Date object
    }
}
