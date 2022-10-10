import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {User} from '../../data/user';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../services/notification.service';

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
}
