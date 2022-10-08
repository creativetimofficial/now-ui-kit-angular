import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {User} from '../../data/user';
import {UserInfo, UserInfoType, UserInfoTypes} from '../../data/user-info';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styles: []
})
export class ProfileSettingsComponent extends BasicModalPageComponent implements OnInit {
    UserInfoTypes = UserInfoTypes;

    // 'role','description','facebook','instagram','twitter','phone','publicMail','studies'

    focus: {
        first: boolean, last: boolean, mail: boolean, password: boolean, passwordConfirm: boolean,
        instagram: boolean, facebook: boolean, publicMail: boolean, studies: boolean, twitter: boolean, phone: boolean,
        modalName: boolean, modalValue: boolean
    } = {
        first: false, last: false, mail: false, password: false, passwordConfirm: false,
        instagram: false, facebook: false, publicMail: false, studies: false, twitter: false, phone: false,
        modalName: false, modalValue: false
    };
    inputValues: { password: string, passwordConfirm: string, modalName: string, modalValue: string, }
        = {password: '', passwordConfirm: '', modalName: '', modalValue: ''};
    tmpUser: User = new User();

    focusArray: boolean[] = [];
    toggleTest: boolean;

    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService) {
        super(global, api, notificationService, modalService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onYourselfLoaded() {
        this.tmpUser = this.user;
        this.focusArray = [];
        for (let i = 0; i < this.tmpUser.userInfos.length; i++) {
            this.focusArray.push(false);
        }
    }

    save() {
        this.comingSoon();
        console.log(this.tmpUser);
    }

    addUserInfo(c: any) {
        const ui: UserInfo = new UserInfo();
        ui.name = this.inputValues.modalName as UserInfoTypes;
        ui.value = this.inputValues.modalValue;
        if (ui.value == null || ui.value.length < 2) {
            this.notificationService.createErrorNotification('Value to short!');
            return;
        }
        if (ui.name === UserInfoTypes.role && this.user.power < 100) {
            this.notificationService.createErrorNotification('You can\'t set your own role!');
            return;
        }
        if (this.busy) {
            return;
        }
        this.setBusy();
        this.api.addUserInfo(ui).then(value => {
            c('done');
            this.resetBusy();
            this.forceReloadYourself();
        }).finally(this.resetBusy);
    }

    deleteUserInfo(ui: UserInfoType) {
        this.comingSoon();
    }

    changeImage() {
        this.comingSoon();
    }
}
