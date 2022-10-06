import {Component, OnInit} from '@angular/core';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-basic-modal-page',
    template: `
        <p>
            basic-modal-page works!
        </p>
    `,
    styles: []
})
export class BasicModalPageComponent extends BasicAuthPageComponent {

    closeResult: string;

    constructor(public global: GlobalService, protected api: ApiService, protected notificationService: NotificationService, protected modalService: NgbModal) {
        super(global, api, notificationService);
    }

    public open(content, type, modalDimension): void {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            this.modalService.open(content, {
                windowClass: 'modal-mini modal-primary',
                size: 'sm'
            }).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else if (modalDimension === undefined && type === 'Login') {
            this.modalService.open(content, {windowClass: 'modal-login modal-primary'}).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        } else {
            this.modalService.open(content).result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
            });
        }

    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
