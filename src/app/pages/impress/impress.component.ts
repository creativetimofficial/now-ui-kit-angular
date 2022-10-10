import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {environment} from '../../../environments/environment';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {GlobalService} from '../../services/global.service';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-impress',
    templateUrl: './impress.component.html',
    styles: []
})
export class ImpressComponent extends BasicAuthPageComponent implements OnInit {
    impress: string = 'Loading';

    constructor(protected global: GlobalService, protected api: ApiService, protected notificationService: NotificationService) {
        super(global, api, notificationService);
    }

    ngOnInit(): void {
        this.api.getContent('https://content.jan-schuettken.de/wiederhold/dsgvo/' + environment.language + '/content.php')
            .then(value => this.impress = value);
    }

}
