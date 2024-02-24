import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRoutingModule} from "./product-routing.module";
import {SharedModule} from "../../../shared/shared.module";
import {ProductComponent} from "./product.component";
import {ProductInfoComponent} from "./product-info/product-info.component";



@NgModule({
  declarations: [
    ProductComponent,
    ProductInfoComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
