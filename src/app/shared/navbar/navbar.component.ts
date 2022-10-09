import {Component, OnInit, ElementRef} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: []
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;
    currentPage = '';

    constructor(public location: Location,
                private element: ElementRef,
                public global: GlobalService,
                private api: ApiService,
                private router: Router,
                private notificationService: NotificationService) {
        this.sidebarVisible = false;
        this.global.updateNavBar.subscribe(value => this.currentPage = value);
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    }

    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    }

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    isDocumentation() {
        const titlee = this.location.prepareExternalUrl(this.location.path());
        return titlee === '/documentation';
    }

    logout() {
        this.api.logout().then(value => this.router.navigate(['/home']).then());
    }

    comingSoon() {
        this.notificationService.createInfoNotification('Coming soon');
    }
}
