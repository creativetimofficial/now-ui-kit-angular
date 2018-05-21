import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-radio-switch',
  templateUrl: './checkbox-radio-switch.component.html',
  styleUrls: ['./checkbox-radio-switch.component.scss']
})
export class CheckboxRadioSwitchComponent implements OnInit {
    state_default = true;

    constructor() { }

    ngOnInit() {}

}
