import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NotificationService} from '../../services/notification.service';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styles: []
})
export class ResetPasswordComponent extends BasicPageComponent {

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
                private router: Router,
                protected notificationService: NotificationService) {
        super(global, notificationService);
    }

    resetPassword() {
        this.api.resetPassword(this.inputValues.mail).then(value => {
            this.notificationService.createSuccessNotification('You have received an mail, please also look in the junk mail folder', -1);
            this.router.navigate(['/login']).then();
        }).catch(reason => this.catchError(reason));

    }
}
