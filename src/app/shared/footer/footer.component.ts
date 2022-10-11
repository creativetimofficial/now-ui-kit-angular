import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    @Input('noDefault') noDefault = false;

    data: Date = new Date();
    version: string;

    constructor() {
    }

    ngOnInit(): void {
        this.version = environment.version;
    }
}
