import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';

declare var _gaq: Function;
declare var fbq: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    private currentRoute:string;
    _location: Location;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor( private renderer : Renderer, private router: Router, @Inject(DOCUMENT,) private document: any, private element : ElementRef, public location: Location) {
      this._location = location;
      router.events.subscribe((event:any) => {
          // Send GA tracking on NavigationEnd event. You may wish to add other
          // logic here too or change which event to work with
          if (event instanceof NavigationEnd) {
              // When the route is '/', location.path actually returns ''.
              let newRoute = location.path() || '/';
              // If the route has changed, send the new route to analytics.
              if (this.currentRoute != newRoute) {
                  _gaq('send', 'pageview', newRoute);
                  fbq('track', 'PageView');
                  this.currentRoute = newRoute;
              }
          }
      });
    }
    ngOnInit() {
        var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();

            this.renderer.listenGlobal('window', 'scroll', (event) => {
                const number = window.scrollY;
                var _location = this.location.path();
                _location = _location.split('/')[2];

                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else if (_location !== 'login' && this.location.path() !== '/nucleoicons' && this.location.path().split('/')[1] !== 'documentation') {
                    // remove logic
                    navbar.classList.add('navbar-transparent');
                }
            });
        });
    }
}
