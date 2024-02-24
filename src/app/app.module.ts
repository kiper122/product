import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';




import {HttpClientModule} from '@angular/common/http'
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';





import{initializeApp,provideFirebaseApp} from '@angular/fire/app';
import {environment} from '../environments/environment';
import {provideStorage,getStorage} from '@angular/fire/storage';
import {provideFirestore,getFirestore} from '@angular/fire/firestore';
import {provideAuth,getAuth} from '@angular/fire/auth';
import { AuthDialogComponent } from './components/auth-dialog/auth-dialog.component';
import { SharedModule } from './shared/shared.module';
import { AlertSaveComponent } from './pages/alert-save/alert-save.component';
import { AlertExitComponent } from './pages/alert-exit/alert-exit.component';
import { AlertCabinetAdressComponent } from './pages/alert-cabinet-adress/alert-cabinet-adress.component';
import { AlertOrderComponent } from './pages/alert-order/alert-order.component';
import { AlertReviewComponent } from './pages/alert-review/alert-review.component';
import {AdminModule} from "./admin/admin.module";
import {AuthorizationModule} from "./pages/authorization/authorization.module";
import {CabinetModule} from "./pages/cabinet/cabinet.module";
import {AboutModule} from "./pages/about/about.module";
import {DiscountModule} from "./pages/discount/discount.module";
import {HomeModule} from "./pages/home/home.module";
import {MenuModule} from "./pages/menu/menu.module";
import {ProductModule} from "./pages/menu/product/product.module";
import {OffertaModule} from "./pages/offerta/offerta.module";
import {PaymentModule} from "./pages/payment/payment.module";
import {PartnersModule} from "./pages/partners/partners.module";
import {ContactModule} from "./pages/contact/contact.module";
import {CheckoutModule} from "./pages/checkout/checkout.module";
import { DialogRegistrationComponent } from './components/dialog-registration/dialog-registration.component';
import { AuthorizationRoutingModule } from './pages/authorization/authorization-routing.module';


@NgModule({
  declarations: [
    // AppHeaderComponent,
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AuthDialogComponent,
    AlertSaveComponent,
    AlertExitComponent,
    AlertCabinetAdressComponent,
    AlertOrderComponent,
    AlertReviewComponent,
    DialogRegistrationComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule,
    CheckoutModule,
    ContactModule,
    PartnersModule,
    PaymentModule,
    OffertaModule,
    ProductModule,
    MenuModule,
    HomeModule,
    DiscountModule,
    AboutModule,
    CabinetModule,
    AuthorizationModule,
    AdminModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(()=> initializeApp(environment.firebase)),
    provideStorage(()=>getStorage()),
    provideFirestore(()=>getFirestore()),
    provideAuth(()=>getAuth()),
    ToastrModule.forRoot(),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
