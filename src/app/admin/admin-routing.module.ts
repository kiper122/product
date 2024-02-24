import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { AdminCategoryComponent } from "./admin-category/admin-category.component";
import { AdminProductComponent } from "./admin-product/admin-product.component";
import { AdminDiscountComponent } from "./admin-discount/admin-discount.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminPaymentComponent } from "./admin-payment/admin-payment.component";
import {authGuard} from "../shared/guards/auth/auth.guard";



const routes: Routes = [
  {
    path:'admin',component:AdminComponent,canActivate:[authGuard],children:[
      {path:'category',component:AdminCategoryComponent},
      {path:'product',component:AdminProductComponent},
      {path:'discount',component:AdminDiscountComponent},
      {path:'orders',component:AdminOrdersComponent},
      {path:'payment',component:AdminPaymentComponent},
      {path:'',pathMatch:'full',redirectTo:'discount'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
