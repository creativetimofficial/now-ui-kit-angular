import {Component, OnInit} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data/user';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styles: []
})
export class AdminComponent extends BasicModalPageComponent implements OnInit {

    publicUsers: User[] = [];

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.api.getPublicUsers(true).then(value => {
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
