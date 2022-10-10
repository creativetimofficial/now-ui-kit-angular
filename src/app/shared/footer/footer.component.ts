import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input('noDefault') noDefault = false;

    data: Date = new Date();

    constructor() {
    }

    ngOnInit(): void {
    }
}
