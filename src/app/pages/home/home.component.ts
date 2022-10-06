import {Component, OnInit} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {User} from '../../data/user';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {ApiService} from '../../services/api.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: []
})
export class HomeComponent extends BasicAuthPageComponent implements OnInit {

    data: Date = new Date();
    focus;
    focus1;

    publicUsers: User[] = [];

    constructor(protected global: GlobalService, protected api: ApiService, protected notificationService: NotificationService) {
        super(global, api, notificationService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.api.getPublicUsers().then(value => {
            this.publicUsers = value;
            for (const u of this.publicUsers) {
                this.api.addUserInfos(u).then().catch(reason => {
                    console.error(this.api.getLastUrl());
                    console.error(reason);
                });
            }
        });
    }

    showPhone(u: User) {
        this.notificationService.createInfoNotification('The Phone number is: ' + u.phone, -1);
    }
}
