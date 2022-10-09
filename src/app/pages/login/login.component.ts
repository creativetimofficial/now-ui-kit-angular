import {Component} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {User} from '../../data/user';
import {Location} from '@angular/common';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: []
})
export class LoginComponent extends BasicPageComponent {

    focus: { focusMail: boolean, focusPassword: boolean } = {
        focusMail: false,
        focusPassword: false
    };
    inputValues: { mail: string, password: string } = {
        mail: '',
        password: ''
    };

    constructor(protected global: GlobalService,
                private api: ApiService,
                protected notificationService: NotificationService,
                private router: Router,
                private location: Location) {
        super(global, notificationService);
    }

    login() {
        if (this.busy) {
            return;
        }
        this.setBusy();
        // if (this.inputValues.search(' ') != -1) {
        //     this.notification.showErrorNotification('Error', 'Keine Leerzeichen im Username!');
        //     return;
        // }

        this.api.login(this.inputValues)
            .then(() => {
                // console.log('login');
                this.global.updateLogin.next(new User());
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
