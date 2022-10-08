import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Rellax from 'rellax';
import {BasicPageComponent} from '../../pages/basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent extends BasicPageComponent implements OnInit, OnDestroy {
    data: Date = new Date();
    focus;
    focus1;

    constructor(protected global: GlobalService, protected notificationService: NotificationService) {
        super(global, notificationService);
    }

    ngOnInit() {
        super.ngOnInit();


        const rellaxHeader = new Rellax('.rellax-header');

        // const body = document.getElementsByTagName('body')[0];
        // body.classList.add('landing-page');
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.add('navbar-transparent');

    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // const body = document.getElementsByTagName('body')[0];
        // body.classList.remove('landing-page');
        // const navbar = document.getElementsByTagName('nav')[0];
        // navbar.classList.remove('navbar-transparent');
    }
}
