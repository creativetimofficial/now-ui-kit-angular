import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {BasicModalPageComponent} from '../basic-modal-page/basic-modal-page.component';
import {GlobalService} from '../../services/global.service';
import {ApiService} from '../../services/api.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NotificationService} from '../../services/notification.service';
import {User, UserRoleType} from '../../data/user';
import {UserInfo, UserInfoType, UserInfoTypes} from '../../data/user-info';
import {ImageCroppedEvent, LoadedImage} from 'ngx-image-cropper';
import {DOC_ORIENTATION, NgxImageCompressService} from 'ngx-image-compress';

@Component({
    selector: 'app-profile-settings',
    templateUrl: './profile-settings.component.html',
    styles: []
})
export class ProfileSettingsComponent extends BasicModalPageComponent implements OnInit {
    UserInfoTypes = UserInfoTypes;
    UserRoleType = UserRoleType;

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
    inputValues: { password: string, passwordConfirm: string, role: string; modalName: string, modalValue: string, }
        = {password: '', passwordConfirm: '', modalName: '', modalValue: '', role: ''};
    tmpUser: User = new User();

    focusArray: boolean[] = [];

    shortLink: string = '';
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file

    //image
    imageChangedEvent: any = '';
    croppedImage: any = '';


    constructor(public global: GlobalService,
                protected api: ApiService,
                protected modalService: NgbModal,
                protected notificationService: NotificationService,
                private imageCompress: NgxImageCompressService) {
        super(global, api, notificationService, modalService);
    }

    ngOnInit() {
        super.ngOnInit();
    }

    onYourselfLoaded() {
        this.tmpUser = this.user.clone();
        console.log(this.user);
        console.log(this.tmpUser);
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

    onChangeImage(event) {
        this.shortLink = '';
        this.imageChangedEvent = event;
        //this.file = event.target.files[0];
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        // this.imageCompress.compressFile(this.croppedImage, DOC_ORIENTATION.Default, 50, 50).then(r  =>);
        // this.urlToFile(this.croppedImage, 'img.png', 'image/png').then(f => this.file = f);
        this.imageCroppedAndCompressed(event.base64).then(f => this.file = f);
    }

    private async imageCroppedAndCompressed(cropped: string): Promise<File> {
        const maxByteSize = 2000000;
        if (this.imageCompress.byteCount(cropped) > 2000000) {
            cropped = await this.imageCompress.compressFile(
                cropped,
                DOC_ORIENTATION.Default,
                50,
                (maxByteSize / this.imageCompress.byteCount(cropped)) * 100
            );
            // console.log(this.imageCompress.byteCount(cropped));
            // console.log((maxByteSize / this.imageCompress.byteCount(cropped)) * 100);
        }
        return await this.urlToFile(cropped, 'img.png', 'image/png');
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
    }

    urlToFile(url, filename, mimeType) {
        return (fetch(url)
                .then(function (res) {
                    return res.arrayBuffer();
                })
                .then(function (buf) {
                    return new File([buf], filename, {type: mimeType});
                })
        );
    }

    uploadImage(c: any): void {

        this.loading = !this.loading;
        // console.log(this.file);
        // tslint:disable-next-line:triple-equals
        if (this.croppedImage == null || this.croppedImage == '') {
            return;
        }
        this.api.server.upload('add/addUserImage.php?', this.file).subscribe((event: any) => {
                // console.log(event);
                // if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event;

                this.loading = false; // Flag variable
                // this.globals.updateToolbar.next(true);
                // }
                c();
                this.forceReloadYourself();
            }
        );
    }

    selectRole(role: UserRoleType) {
        this.api.updateUserRole(role).then(value => {
            this.notificationService.createSuccessNotification('Role updated to: ' + role.toString());
            this.forceReloadYourself();
        }).catch(this.catchError);
    }
}
