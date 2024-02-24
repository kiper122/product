import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OffertaRoutingModule} from "./offerta-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {OffertaComponent} from "./offerta.component";



@NgModule({
  declarations: [
    OffertaComponent
  ],
  imports: [
    CommonModule,
    OffertaRoutingModule,
    SharedModule
  ]
})
export class OffertaModule { }
