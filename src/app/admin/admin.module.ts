import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import {AdminComponent} from "./admin.component";
import {SharedModule} from "../shared/shared.module";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminDiscountComponent } from "./admin-discount/admin-discount.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminPaymentComponent } from "./admin-payment/admin-payment.component";



@NgModule({
  declarations: [
    AdminComponent,
    AdminCategoryComponent,
    AdminProductComponent,
    AdminDiscountComponent,
    AdminOrdersComponent,
    AdminPaymentComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
