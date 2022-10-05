import {Component, OnInit} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../services/global.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends BasicPageComponent {

    data: Date = new Date();
    focus;
    focus1;

    constructor(protected global: GlobalService) {
        super(global);
    }

}
