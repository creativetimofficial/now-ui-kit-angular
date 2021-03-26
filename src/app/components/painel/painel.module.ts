import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { NouisliderModule } from "ng2-nouislider";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { RouterModule } from "@angular/router";
import { PainelComponent } from "./painel.component";
import { detalhesBrasilComponent } from "app/modais/detalhes-evolucao/detalhes-evolucao.component";
import { comunicadoComponent } from "app/modais/comunicado/comunicado.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    NouisliderModule,
    RouterModule,
    JwBootstrapSwitchNg2Module,
  ],
  declarations: [PainelComponent, detalhesBrasilComponent, comunicadoComponent],
  exports: [PainelComponent, detalhesBrasilComponent, comunicadoComponent],
})
export class PainelModule {}
