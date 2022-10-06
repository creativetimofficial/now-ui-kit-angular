import {Component, OnInit} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data/user';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styles: []
})
export class ProfileSettingsComponent extends BasicModalPageComponent implements OnInit {

    // 'role','description','facebook','instagram','twitter','phone','publicMail','studies'

    focus: {
        first: boolean, last: boolean, mail: boolean, password: boolean, passwordConfirm: boolean,
        instagram: boolean, facebook: boolean, publicMail: boolean, studies: boolean, twitter: boolean, phone: boolean
    } = {
        first: false, last: false, mail: false, password: false, passwordConfirm: false,
        instagram: false, facebook: false, publicMail: false, studies: false, twitter: false, phone: false
    };
    inputValues: { password: string, passwordConfirm: string, }
        = {password: '', passwordConfirm: ''};
    tmpUser: User = new User();

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onYourselfLoaded() {
        this.tmpUser = this.user;
    }

    save() {
        this.comingSoon();
    }
}
