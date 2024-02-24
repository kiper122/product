import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaymentRoutingModule} from "./payment-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {PaymentComponent} from "./payment.component";



@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
