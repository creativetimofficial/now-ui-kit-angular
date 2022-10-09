import {Component, OnInit} from '@angular/core';
import {IAlert, NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-notifications',
    templateUrl: './notifications.component.html',
    styleUrls: []
})
export class NotificationsComponent implements OnInit {

    public alerts: Array<IAlert> = [];

    constructor(private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.notificationService.newNotification.subscribe(value => {
                this.alerts.push(value);
                if (value.time != null && value.time > 0) {
                    setTimeout(() => {
                        this.closeAlert(value);
                    }, value.time);
                }
            }
        );
    }

    public closeAlert(alert: IAlert) {
        const index: number = this.alerts.indexOf(alert);
        this.alerts.splice(index, 1);
    }
}
