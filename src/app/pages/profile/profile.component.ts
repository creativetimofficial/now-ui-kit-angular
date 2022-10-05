import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {GlobalService} from '../../services/global.service';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BasicAuthPageComponent implements OnInit, OnDestroy {
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

    constructor(public global: GlobalService, protected api: ApiService) {
        super(global, api);
    }

    ngOnInit() {
        super.ngOnInit();

        const rellaxHeader = new Rellax('.rellax-header');

        // const body = document.getElementsByTagName('body')[0];
        // body.classList.add('profile-page');
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.add('navbar-transparent');

    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // const body = document.getElementsByTagName('body')[0];
        // body.classList.remove('profile-page');
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.remove('navbar-transparent');
    }

}
