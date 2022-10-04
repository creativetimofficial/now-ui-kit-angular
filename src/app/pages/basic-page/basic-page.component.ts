import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../shared/global/global.service';

@Component({
    selector: 'app-basic-page',
    templateUrl: './basic-page.component.html',
    styleUrls: ['./basic-page.component.scss']
})
export class BasicPageComponent implements OnInit, OnDestroy  {

    constructor(protected global: GlobalService) {
    }

    ngOnInit(): void {
        console.log('ngOnInit', this.constructor.name);
        this.global.updateNavBar.next(this.constructor.name);
    }

    ngOnDestroy() {
        console.log('ngOnDestroy', this.constructor.name);
        this.global.updateNavBar.next(null);
    }

}
