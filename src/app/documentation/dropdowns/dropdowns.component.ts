import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styleUrls: ['./dropdowns.component.scss']
})
export class DropdownsComponent implements OnInit {
    state_icon_primary = true;
    constructor(config: NgbDropdownConfig) {
        // customize default values of dropdowns used by this component tree
        config.placement = 'top-left';
        config.autoClose = true;
    }

  ngOnInit() {
  }

}
