import { HttpClient } from "@angular/common/http";
import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgbDateStruct, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgbAccordionConfig } from "@ng-bootstrap/ng-bootstrap";
import { detalhesBrasilComponent } from "app/modais/detalhes-Brasil.component";

import * as $ from "jquery";
@Component({
  selector: "app-painel",
  templateUrl: "./painel.component.html",
  styles: [
    `
      ngb-progressbar {
        margin-top: 5rem;
      }
    `,
  ],
})
export class PainelComponent implements OnInit, OnDestroy {
  @Input() name;
  date: { year: number; month: number };
  model: NgbDateStruct;
  qtdDias: any;
  taxaTransmissãoCovidBrasil = 1.21;
  readonly apiURL: string;
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

  constructor(
    config: NgbAccordionConfig,
    private http: HttpClient,
    private modalService: NgbModal
  ) {
    config.closeOthers = true;
    config.type = "info";
    this.apiURL = "https://api.covid19api.com";
  }

  ngOnInit() {
    this.getListaCasosMundo();
  }

  ngOnDestroy() {}

  calcula() {
    this.dadosBrasil = [];
    var data = new Date();
    let previsaoNovosCasos =
      this.dadosCovid.NovosCasosBrasil *
      this.dadosCovid.taxaTransmissaoCovidBrasil;

    const dadosTemporario = []
    dadosTemporario.push({
      Data: data.toLocaleDateString(),
      NovosCasos: previsaoNovosCasos,
      TotalCasos: previsaoNovosCasos + this.dadosCovid.TotalConfirmadoBrasil,
    });

    for (let i = 0; i < this.qtdDias; i++) {
      let previsaoNovosCasos =
      dadosTemporario[i].NovosCasos *
        this.dadosCovid.taxaTransmissaoCovidBrasil;
      data.setDate(data.getDate() + 1);
      dadosTemporario.push({
        Data: data.toLocaleDateString(),
        NovosCasos: previsaoNovosCasos,
        TotalCasos: previsaoNovosCasos + dadosTemporario[i].TotalCasos,
      });
      this.dadosBrasil.push({
        Data: data.toLocaleDateString(),
        NovosCasos: previsaoNovosCasos,
        TotalCasos: previsaoNovosCasos + dadosTemporario[i].TotalCasos,
      });
    }

    this.open();
  }

  open() {
    const modalRef = this.modalService.open(detalhesBrasilComponent);
    modalRef.componentInstance.qtdDias = this.qtdDias;
    modalRef.componentInstance.dadosBrasil = this.dadosBrasil;
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
  //#endregion
}
