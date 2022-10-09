import {Component} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {User} from '../../data/user';
import {NotificationService} from '../../services/notification.service';
import {Location} from '@angular/common';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: []
})
export class RegisterComponent extends BasicPageComponent {

    focus: { focusFirst: boolean, focusLast: boolean, focusMail: boolean, focusPassword: boolean } = {
        focusFirst: false,
        focusLast: false,
        focusMail: false,
        focusPassword: false
    };
    inputValues: { firstName: string, lastName: string, mail: string, password: string } = {
        firstName: '',
        lastName: '',
        mail: '',
        password: ''
    };

    constructor(protected global: GlobalService,
                private api: ApiService,
                protected notificationService: NotificationService,
                private location: Location) {
        super(global, notificationService);
    }

    register(): void {
        if (this.busy) {
            return;
        }
        this.setBusy();
        // if (this.inputValues.search(' ') != -1) {
        //     this.notification.showErrorNotification('Error', 'Keine Leerzeichen im Username!');
        //     return;
        // }

        this.api.register(this.inputValues)
            .then(() => {
                this.notificationService.createSuccessNotification('Registration complete!');
                console.log('registered');
                this.login();
            }).catch((e) => {
            this.notificationService.createErrorNotification(e.toString());
            console.log(this.api.getLastUrl());
            console.log(e);

            // this.notification.showErrorNotification('Error', e);
        }).finally(() => this.resetBusy());

        // const url = 'addUser.php?'
        //     + '&password=' + this.inputValues.password
        //     + '&email=' + this.inputValues.mail
        //     + '&firstName=' + this.inputValues.firstName
        //     + '&lastName=' + this.inputValues.lastName;
        // this.api.getEx(url, false, false)
        //     .then(() => {
        //         this.login(value.username, value.password, value.code);
        //     }).catch((e) => {
        //     this.notification.showErrorNotification('Error', e);
        // }).finally(() => this.resetBusy());
    }

    login() {
        // if (this.inputValues.search(' ') != -1) {
        //     this.notification.showErrorNotification('Error', 'Keine Leerzeichen im Username!');
        //     return;
        // }

        this.api.login(this.inputValues)
            .then(() => {
                // console.log('login');
                // this.global.updateLogin.next(new User());
                // this.router.navigate(['/home']).then();
                this.location.back();
                this.api.getYourself().then(value => this.user = value);
                // this.api.login(value.username, value.password, value.code);
            }).catch((e) => {
            this.notificationService.createErrorNotification('Login was not possible');
            console.log(e);
            // this.notification.showErrorNotification('Error', e);
        }).finally(() => this.resetBusy());
    }
}
