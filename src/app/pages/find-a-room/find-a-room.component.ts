import {Component, OnInit} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {TimeSpan, TimeSpanTypes} from '../../data/timeSpan';
import {RoomData} from '../../data/room-data';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'app-find-a-room',
    templateUrl: './find-a-room.component.html',
    styles: []
})
export class FindARoomComponent extends BasicModalPageComponent implements OnInit {
    startDate: NgbDateStruct;
    endDate: NgbDateStruct;
    modalDescription: string;
    modalDescriptionRequest: string;

    roomOffers: RoomData[] = [];
    roomRequests: RoomData[] = [];

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
    }

    ngOnInit() {
        super.ngOnInit();
        this.loadRoomOffers();
    }

    loadRoomOffers() {
        this.api.getRoomData(TimeSpanTypes.offer).then(rooms => {
            this.roomOffers = rooms.filter(room =>
                this.toDate(room.timeSpan.endDate).getTime() > new Date().getTime());
        }).catch(this.catchError);
        this.api.getRoomData(TimeSpanTypes.searching).then(rooms => {
            this.roomRequests = rooms.filter(room =>
                this.toDate(room.timeSpan.endDate).getTime() > new Date().getTime());
        });
    }

    requestARoom(c: any) {
        const timeSpan: TimeSpan = new TimeSpan();
        timeSpan.description = this.modalDescription;
        timeSpan.date = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        timeSpan.endDate = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        timeSpan.type = TimeSpanTypes.searching;
        this.addTimeSpan(c, timeSpan);
    }

    offerARoom(c: any) {
        const timeSpan: TimeSpan = new TimeSpan();
        timeSpan.description = this.modalDescription;
        timeSpan.date = this.startDate.year + '-' + this.startDate.month + '-' + this.startDate.day;
        timeSpan.endDate = this.endDate.year + '-' + this.endDate.month + '-' + this.endDate.day;
        timeSpan.type = TimeSpanTypes.offer;
        this.addTimeSpan(c, timeSpan);
    }

    private addTimeSpan(c: any, timeSpan: TimeSpan) {
        this.api.addTimeSpan(timeSpan).then(value => {
            c();
            this.modalDescription = '';
            this.startDate = null;
            this.endDate = null;
            this.api.addTimeSpans(this.user).then();
            this.notificationService.createSuccessNotification('Done!');
            this.loadRoomOffers();
        }).catch(reason => {
            console.log(this.api.getLastUrl());
            this.notificationService.createErrorNotification(reason);
        });
    }

    requestSelectedRoom(room: RoomData, c: any) {
        if (!this.isLoggedIn()) {
            this.notificationService.createWarningNotification('You need to be logged in to request a room');
            return;
        }
        if (this.modalDescriptionRequest == null || this.modalDescriptionRequest?.length < 20) {
            this.notificationService.createWarningNotification('Your application Text is too short');
            return;
        }
        this.api.requestRoom(room, this.modalDescriptionRequest.toString()).then(value => {
            this.notificationService.createSuccessNotification('Your application was send!');
            c();
        }).catch(reason => {
            console.log(this.api.getLastUrl());
            this.catchError(reason);
        });
    }

    respondToSelectedRequest(room: RoomData, c: any) {
        if (!this.isLoggedIn()) {
            this.notificationService.createWarningNotification('You need to be logged in to request a room');
            return;
        }
        if (this.modalDescriptionRequest == null || this.modalDescriptionRequest?.length < 20) {
            this.notificationService.createWarningNotification('Your application Text is too short');
            return;
        }
        this.api.respondToRoomRequest(room, this.modalDescriptionRequest.toString()).then(value => {
            this.notificationService.createSuccessNotification('Your application was send!');
            c();
        }).catch(reason => {
            console.log(this.api.getLastUrl());
            this.catchError(reason);
        });
    }

    formatDateForRoomOffer(date: string): string {
        return this.formatDate(date, 'EE, d MMMM YYYY');
    }
}
