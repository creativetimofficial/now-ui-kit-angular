import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {GlobalService} from '../../services/global.service';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Params} from '@angular/router';
import {User} from '../../data/user';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: []
})
export class ProfileComponent extends BasicModalPageComponent implements OnInit {
    zoom = 14;
    lat = 44.445248;
    lng = 26.099672;
    styles: any[] = [{
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'color': '#e9e9e9'}, {'lightness': 17}]
    }, {
        'featureType': 'landscape',
        'elementType': 'geometry',
        'stylers': [{'color': '#f5f5f5'}, {'lightness': 20}]
    }, {
        'featureType': 'road.highway',
        'elementType': 'geometry.fill',
        'stylers': [{'color': '#ffffff'}, {'lightness': 17}]
    }, {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#ffffff'}, {'lightness': 29}, {'weight': 0.2}]
    }, {
        'featureType': 'road.arterial',
        'elementType': 'geometry',
        'stylers': [{'color': '#ffffff'}, {'lightness': 18}]
    }, {
        'featureType': 'road.local',
        'elementType': 'geometry',
        'stylers': [{'color': '#ffffff'}, {'lightness': 16}]
    }, {'featureType': 'poi', 'elementType': 'geometry', 'stylers': [{'color': '#f5f5f5'}, {'lightness': 21}]}, {
        'featureType': 'poi.park',
        'elementType': 'geometry',
        'stylers': [{'color': '#dedede'}, {'lightness': 21}]
    }, {
        'elementType': 'labels.text.stroke',
        'stylers': [{'visibility': 'on'}, {'color': '#ffffff'}, {'lightness': 16}]
    }, {
        'elementType': 'labels.text.fill',
        'stylers': [{'saturation': 36}, {'color': '#333333'}, {'lightness': 40}]
    }, {'elementType': 'labels.icon', 'stylers': [{'visibility': 'off'}]}, {
        'featureType': 'transit',
        'elementType': 'geometry',
        'stylers': [{'color': '#f2f2f2'}, {'lightness': 19}]
    }, {
        'featureType': 'administrative',
        'elementType': 'geometry.fill',
        'stylers': [{'color': '#fefefe'}, {'lightness': 20}]
    }, {
        'featureType': 'administrative',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#fefefe'}, {'lightness': 17}, {'weight': 1.2}]
    }];
    data: Date = new Date();
    focus;
    focus1;
    private routeParams: Params;
    private displayUserId = -1;
    displayUser: User;

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

    formatDateForTimeline(date: string): string {
        try {
            let back = date;
            back = back.split(' ')[0];
            back = this.replaceAll(back, '-', '.');
            return back;
        } catch (e) {
            return date;
        }
    }
}
