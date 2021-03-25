import { Component, OnInit,  OnDestroy } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import * as $ from 'jquery';
@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styles: [`
    ngb-progressbar {
        margin-top: 5rem;
    }
    `]
})

export class ComponentsComponent implements OnInit, OnDestroy {
    date: {year: number, month: number};
    model: NgbDateStruct;
    qtdDias: any;
    taxaTransmissãoCovid = 1.21;

    constructor( config: NgbAccordionConfig) {
        config.closeOthers = true;
        config.type = 'info';
    }

    ngOnInit() {
    }
    
    ngOnDestroy(){}

    calcula(){
       alert(this.taxaTransmissãoCovid * 82493 + 12130019)
    }
    
}
