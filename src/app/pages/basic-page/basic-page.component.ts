import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {User} from '../../data/user';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-basic-page',
    template: `
        <p>
            basic-auth-page works!
        </p>
    `,
    styles: []
})
export class BasicPageComponent implements OnInit, OnDestroy {
    user: User = null;
    private _busy: boolean = false;

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

    get busy(): boolean {
        return this._busy;
    }

    set busy(value: boolean) {
        this._busy = value;
    }

    setBusy() {
        this.busy = true;
    }

    resetBusy() {
        this.busy = false;
    }

    sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
