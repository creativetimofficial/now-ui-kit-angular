import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { comunicadoComponent } from '../comunicado/comunicado.component';
@Component({
    selector: 'app-detalhes-evolucao',
    templateUrl: './detalhes-evolucao.component.html',
    styleUrls: ['./detalhes-evolucao.component.scss']
})

export class detalhesBrasilComponent implements OnInit {
    @Input() qtdDias;    
    @Input() dadosBrasil;
    @Input() relatorioCritico;
    tipoVisao: boolean;
    textoButton: any;
    titulo: any;
    tituloPrevisao: any;


    constructor(public activeModal: NgbActiveModal,      
    private modalService: NgbModal)  {
    }

    ngOnInit() {
      this.tipoVisao = false;
      this.changeVisao();     
    }  

    changeVisao(){
      this.tipoVisao = !this.tipoVisao;
      if(this.tipoVisao){
        this.titulo = "Brasil"
        this.textoButton = "Ver Situação Global"
      }else{              
      this.titulo = "Global"
      this.textoButton = 'Ver Situação Nacional'
      }

      if(this.qtdDias > 1)
      this.tituloPrevisao =  "Previsão para os próximos " + this.qtdDias +" dias | " + this.titulo;
      else 
      this.tituloPrevisao =  "Previsão para amanhã | " + this.titulo;

    }

    //#region 
    
  openComunicado() {
    const modalRef = this.modalService.open(comunicadoComponent);
    modalRef.componentInstance.dados = this.relatorioCritico;
  }
    //#endregion
}
