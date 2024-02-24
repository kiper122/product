import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product.component";
import {ProductInfoComponent} from "./product-info/product-info.component";
import {ProductService} from "../../../shared/services/product/product.service";



const routes: Routes = [
  {
    path:'menu/:product/:category',component:ProductComponent
  },
  {path:'menu/:product/:category/:id',component:ProductInfoComponent,
    resolve:{
      productInfo:ProductService
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
