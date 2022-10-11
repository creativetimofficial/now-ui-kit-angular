import {Component, OnInit} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-basic-auth-page',
    template: `
        <p>
            basic-auth-page works!
        </p>
    `,
    styles: []
})
export class BasicAuthPageComponent extends BasicPageComponent implements OnInit {

    disableLoadYourself = false;
    forceOnlineLoadYourself = false;

    constructor(protected global: GlobalService, protected api: ApiService, protected notificationService: NotificationService) {
        super(global, notificationService);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.loadYourself();
    }

    loadYourself(): void {
        if (this.api.server.authService.checkSessionId()) {
            if (!this.disableLoadYourself) {
                if (this.user == null) {
                    this.api.getYourself(this.forceOnlineLoadYourself).then(value => {
                        this.user = value;
                        this.onYourselfLoaded();
                    });
                } else {
                    this.onYourselfLoaded();
                }
            }
        }
    }

    forceReloadYourself() {
        this.api.getYourself(true).then(value => {
            this.user = value;
            this.onYourselfLoaded();
        });
    }

    onYourselfLoaded() {

    }

    isLoggedIn(): boolean {
        return this.user != null;
    }
}
