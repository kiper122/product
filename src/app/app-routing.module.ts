import { NgModule } from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import { ProductComponent } from './pages/menu/product/product.component';

const routes: Routes = [
  {
    path:'',
    loadChildren: ()=> import('./pages/home/home.module').then(m=>m.HomeModule)
  },
  {
    path:'discounts',
    loadChildren: ()=> import('./pages/discount/discount.module').then(m=>m.DiscountModule)
  },
  {
    path:'menu/:product/:category',component:ProductComponent
  },
  {
    path:'auth',
    loadChildren: ()=> import('./pages/authorization/authorization.module').then(m=>m.AuthorizationModule)
  },
  {
    path:'cabinet',
    loadChildren: ()=> import('./pages/cabinet/cabinet.module').then(m=>m.CabinetModule)
  },
  {
    path:'about',
    loadChildren: ()=> import('./pages/about/about.module').then(m=>m.AboutModule)
  },
  {
    path:'offerta',
    loadChildren: ()=> import('./pages/offerta/offerta.module').then(m=>m.OffertaModule)
  },
  {
    path:'payment',
    loadChildren: ()=> import('./pages/payment/payment.module').then(m=>m.PaymentModule)
  },
  {
    path:'partners',
    loadChildren: ()=> import('./pages/partners/partners.module').then(m=>m.PartnersModule)
  },
  {
    path:'contacts',
    loadChildren: ()=> import('./pages/contact/contact.module').then(m=>m.ContactModule)
  },
  {
    path:'checkout',
    loadChildren: ()=> import('./pages/checkout/checkout.module').then(m=>m.CheckoutModule)
  },
  {
    path:'menu',
    loadChildren: ()=> import('./pages/menu/menu.module').then(m=>m.MenuModule)
  },
  {
    path:'admin',
    loadChildren: ()=> import('./admin/admin.module').then(m=>m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
