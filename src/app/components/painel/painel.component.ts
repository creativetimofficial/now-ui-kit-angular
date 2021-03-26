import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { detalhesBrasilComponent } from "app/modais/detalhes-evolucao/detalhes-evolucao.component";

import * as $ from "jquery";
@Component({
  selector: "app-painel",
  templateUrl: "./painel.component.html",
  styleUrls: ["./painel.component.scss"],
})
export class PainelComponent implements OnInit {
  @Input() name;
  date: { year: number; month: number };
  model: NgbDateStruct;
  qtdDias: any;
  taxaTransmissãoCovidBrasil = 1.21;
  readonly apiURL: string;
  readonly apiIBGE: string;
  casosMundial: any = [];
  casosBrasil: any;

  dadosCovid: any = {
    TotalConfirmadoBrasil: null,
    TotalConfirmadoGlobal: null,
    NovosCasosBrasil: null,
    NovosCasosGlobal: null,
    taxaTransmissaoCovidBrasil: 1.21,
    mediaTaxaTranmissaoCovidGlobal: 1.2,
  };

  dadosBrasil: any = [];
  populacaoBrasileira: any; //211755692;
  relatorioCritico: any = [];

  constructor(
    config: NgbAccordionConfig,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    config.closeOthers = true;
    config.type = "info";
    this.apiURL = "https://api.covid19api.com";
    this.apiIBGE = "https://servicodados.ibge.gov.br/api/v1/projecoes";
  }

  ngOnInit() {
    this.getPopulacaoIBGE();
    this.getListaCasosMundo();
  }

 
  calcula() {
    this.relatorioCritico = []
    let limiteUtrapassado = false;
    this.dadosBrasil = [];
    var data = new Date();
    let previsaoNovosCasos =
      this.dadosCovid.NovosCasosBrasil *
      this.dadosCovid.taxaTransmissaoCovidBrasil;

    let previsaoNovosCasosGlobal =
      this.dadosCovid.NovosCasosGlobal *
      this.dadosCovid.mediaTaxaTranmissaoCovidGlobal;

    const dadosTemporario = [];
    dadosTemporario.push({
      Data: data.toLocaleDateString(),
      NovosCasos: previsaoNovosCasos,
      NovosCasosGlobal: previsaoNovosCasosGlobal,
      TotalCasos: previsaoNovosCasos + this.dadosCovid.TotalConfirmadoBrasil,
      TotalCasosGlobal:
        previsaoNovosCasos + this.dadosCovid.TotalConfirmadoGlobal,
    });

    for (let i = 0; i < this.qtdDias; i++) {
      let previsaoNovosCasos =
        dadosTemporario[i].NovosCasos *
        this.dadosCovid.taxaTransmissaoCovidBrasil;

      let previsaoNovosCasosGlobal =
        dadosTemporario[i].NovosCasosGlobal *
        this.dadosCovid.mediaTaxaTranmissaoCovidGlobal;

      data.setDate(data.getDate() + 1);
      dadosTemporario.push({
        Data: data.toLocaleDateString(),
        NovosCasos: previsaoNovosCasos,
        NovosCasosGlobal: previsaoNovosCasosGlobal,
        TotalCasos: previsaoNovosCasos + dadosTemporario[i].TotalCasos,
        TotalCasosGlobal:
          previsaoNovosCasosGlobal + dadosTemporario[i].TotalCasosGlobal,
      });
      this.dadosBrasil.push({
        Data: data.toLocaleDateString(),
        NovosCasos: previsaoNovosCasos,
        NovosCasosGlobal: previsaoNovosCasosGlobal,
        TotalCasos: previsaoNovosCasos + dadosTemporario[i].TotalCasos,
        TotalCasosGlobal:
          previsaoNovosCasosGlobal + dadosTemporario[i].TotalCasosGlobal,
      });

      if (
        parseInt(this.populacaoBrasileira.projecao.populacao) < parseInt(this.dadosBrasil[i].TotalCasos) && !limiteUtrapassado
        
      ) {
        this.relatorioCritico.push({
          quantidadeDeDias: i + 1,
          data: data.toLocaleDateString(),
          dataIBG: this.populacaoBrasileira.horario,
          populacaoBrasileira: this.populacaoBrasileira.projecao.populacao,
          totalCasos: this.dadosBrasil[i].TotalCasos
        });
        limiteUtrapassado = true;
      }
    }
     this.open(); 
  }

  open() {
    const modalRef = this.modalService.open(detalhesBrasilComponent);
    modalRef.componentInstance.qtdDias = this.qtdDias;
    modalRef.componentInstance.dadosBrasil = this.dadosBrasil;
    modalRef.componentInstance.relatorioCritico = this.relatorioCritico || null;
  }

  // #region REST

  getListaCasosMundo() {
    this.http.get(`${this.apiURL}/summary`).subscribe(
      (dados) => {
        this.casosMundial = dados;

        // VISÃO GLOBAL
        this.dadosCovid.TotalConfirmadoGlobal = this.casosMundial.Global.TotalConfirmed;
        this.dadosCovid.NovosCasosGlobal = this.casosMundial.Global.NewConfirmed;

        // VISÃO NACIONAL
        this.casosBrasil = this.casosMundial.Countries.filter(
          (element) => element.CountryCode === "BR"
        );
        this.dadosCovid.TotalConfirmadoBrasil = this.casosBrasil[0].TotalConfirmed;
        this.dadosCovid.NovosCasosBrasil = this.casosBrasil[0].NewConfirmed;
      },
      (erro) => {
        if (erro.status == 404) {
          console.log("Informação não localizada.");
        }
      }
    );
  }

  getPopulacaoIBGE() {
    this.http.get(`${this.apiIBGE}/populacao`).subscribe(
      (dados) => {
        this.populacaoBrasileira = dados;
      },
      (erro) => {
        if (erro.status == 404) {
          console.log("Informação não localizada.");
        }
      }
    );
  }
  //#endregion
}
