import {Component, OnInit} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-find-a-room',
    templateUrl: './find-a-room.component.html',
    styles: []
})
export class FindARoomComponent extends BasicModalPageComponent {

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
    }

}
