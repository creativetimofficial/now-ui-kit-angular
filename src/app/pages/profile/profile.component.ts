import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {GlobalService} from '../../services/global.service';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Params} from '@angular/router';
import {User, UserRoleType} from '../../data/user';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {NgbDateStruct, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {TimeSpan, TimeSpanTypes} from '../../data/timeSpan';
import {DatePipe} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: []
})
export class ProfileComponent extends BasicModalPageComponent implements OnInit {
    zoom = 14;
    lat = 44.445248;
    lng = 26.099672;
    // styles: any[] = [{
    //     'featureType': 'water',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#e9e9e9'}, {'lightness': 17}]
    // }, {
    //     'featureType': 'landscape',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]
    // }, {
    //     'featureType': 'road.highway',
    //     'elementType': 'geometry.fill',
    //     'stylers': [{'color': '#ffffff'}, {'lightness': 17}]
    // }, {
    //     'featureType': 'road.highway',
    //     'elementType': 'geometry.stroke',
    //     'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]
    // }, {
    //     'featureType': 'road.arterial',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#ffffff'}, {'lightness': 18}]
    // }, {
    //     'featureType': 'road.local',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#ffffff'}, {'lightness': 16}]
    // }, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]}, {
    //     'featureType': 'poi.park',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#dedede'}, {'lightness': 21}]
    // }, {
    //     'elementType': 'labels.text.stroke',
    //     'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]
    // }, {
    //     'elementType': 'labels.text.fill',
    //     'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]
    // }, {'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {
    //     'featureType': 'transit',
    //     'elementType': 'geometry',
    //     'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]
    // }, {
    //     'featureType': 'administrative',
    //     'elementType': 'geometry.fill',
    //     'stylers': [{'color': '#fefefe'}, {'lightness': 20}]
    // }, {
    //     'featureType': 'administrative',
    //     'elementType': 'geometry.stroke',
    //     'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]
    // }];
    UserRoleType = UserRoleType;

    data: Date = new Date();
    focus: {
        modalDescription: boolean, modalTitle: boolean
    } = {
        modalDescription: false, modalTitle: false
    };
    inputValues: { modalDescription: string, modalTitle: string }
        = {modalDescription: '', modalTitle: ''};
    private routeParams: Params;
    private displayUserId = -1;
    displayUser: User;
    model: NgbDateStruct;

    constructor(public global: GlobalService,
                protected api: ApiService,
                public route: ActivatedRoute,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
        this.disableLoadYourself = true;
    }

    ngOnInit() {
        super.ngOnInit();
        this.subscriptions.push(this.route.params.subscribe(routeParams => {
            this.routeParams = routeParams;

            if (routeParams.id === undefined) {
                this.displayUserId = -1;
                this.forceReloadYourself();
            } else {
                // tslint:disable-next-line:radix
                this.displayUserId = parseInt(routeParams.id);
                this.reload(this.displayUserId);
            }
            // console.log(this.displayUserId);
        }));

    }

    onYourselfLoaded() {
        this.displayUser = this.user;
    }

    private reload(userId: number) {
        this.api.getUser(userId, true)
            .then(value => this.displayUser = value)
            .catch(reason => console.log(this.api.getLastUrl()));
    }

    isYourself(): boolean {
        return this.user != null && this.displayUser?.userId === this.user?.userId;
    }

    formatDateForTimeline(date: string): string {
        return this.formatDate(date, 'MMMM YYYY');
    }

    addTimeline(c: any) {
        const timeSpan: TimeSpan = new TimeSpan();
        timeSpan.title = this.inputValues.modalTitle;
        timeSpan.description = this.inputValues.modalDescription;
        timeSpan.date = this.model.year + '-' + this.model.month + '-' + this.model.day;
        timeSpan.type = TimeSpanTypes.milestone;
        this.api.addTimeSpan(timeSpan).then(value => {
            c();
            this.inputValues.modalTitle = '';
            this.inputValues.modalDescription = '';
            this.model = null;
            this.api.addTimeSpans(this.displayUser).then();
        }).catch(reason => {
            console.log(this.api.getLastUrl());
            this.notificationService.createErrorNotification(reason);
        });
    }

    resendConfirmCode() {
        this.comingSoon();
    }

    selectRole(role: UserRoleType) {
        this.api.updateUserRole(role).then(value => {
            this.notificationService.createSuccessNotification('Role updated to: ' + role.toString());
            this.forceReloadYourself();
        }).catch(this.catchError);
    }
}
