import {Component, OnInit} from '@angular/core';
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
    mail: string = '';
    name: string = '';
    description: string = '';

    constructor(protected global: GlobalService, protected api: ApiService, protected notificationService: NotificationService) {
        super(global, api, notificationService);
        this.forceOnlineLoadYourself = true;
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

    askAQuestion() {
        if (this.mail.length > 7 && this.name.length > 7 && this.description.length > 10) {
            this.api.askAQuestion(this.mail, this.name, this.description).then(value => {
                this.notificationService.createSuccessNotification('Your application was send!');
                this.mail = this.name = this.description = '';
            }).catch(reason => {
                console.log(this.api.getLastUrl());
                this.catchError(reason);
            });
        } else {
            this.notificationService.createWarningNotification('Please fill out all Field correctly');
        }
    }

    resendConfirmCode() {
        this.comingSoon();
    }
}
