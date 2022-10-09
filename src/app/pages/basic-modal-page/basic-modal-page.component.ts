import {Component, OnInit} from '@angular/core';
import {BasicAuthPageComponent} from '../basic-auth-page/basic-auth-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute} from '@angular/router';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {RoomData} from '../../data/room-data';

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
    selectedRoom: RoomData = null;

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected notificationService: NotificationService,
                protected modalService: NgbModal) {
        super(global, api, notificationService);
    }

    openRequestRoomModal(content, type, modalDimension, object: RoomData) {
        this.selectedRoom = object;
        this.open(content, type, modalDimension);
    }

    public open(content, type, modalDimension, object: any = null): void {
        if (modalDimension === 'sm' && type === 'modal_mini') {
            const modal: NgbModalRef = this.modalService.open(content, {
                windowClass: 'modal-mini modal-primary',
                size: 'sm'
            });
            // (modal.componentInstance).room = object;
            modal.result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${BasicModalPageComponent.getDismissReason(reason)}`;
            });
        } else if (modalDimension === undefined && type === 'Login') {
            const modal: NgbModalRef = this.modalService.open(content, {windowClass: 'modal-login modal-primary'});
            // (modal.componentInstance).room = object;
            modal.result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${BasicModalPageComponent.getDismissReason(reason)}`;
            });
        } else {
            const modal: NgbModalRef = this.modalService.open(content);
            // modal.componentInstance.room = object;
            modal.result.then((result) => {
                this.closeResult = `Closed with: ${result}`;
            }, (reason) => {
                this.closeResult = `Dismissed ${BasicModalPageComponent.getDismissReason(reason)}`;
            });
        }

    }

    private static getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

}
