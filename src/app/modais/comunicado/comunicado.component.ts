import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'app-comunicado',
    templateUrl: './comunicado.component.html',
    styleUrls: ['./comunicado.component.scss']
})

export class comunicadoComponent implements OnInit {
    @Input() dados;    


    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {  
    }  

}
