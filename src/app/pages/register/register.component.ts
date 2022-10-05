import {Component} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
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

    constructor(protected global: GlobalService, private api: ApiService) {
        super(global);
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
                console.log('registered');
                // this.api.login(value.username, value.password, value.code);
            }).catch((e) => {
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

}
