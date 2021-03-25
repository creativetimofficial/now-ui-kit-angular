import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
    selector: 'app-detalhes-Brasil',
    templateUrl: './detalhes-Brasil.component.html',
    styleUrls: ['./detalhes-Brasil.component.scss']
})

export class detalhesBrasilComponent implements OnInit {
    @Input() qtdDias;    
    @Input() dadosBrasil;
    

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
      console.log(this.dadosBrasil)
    }  
}
