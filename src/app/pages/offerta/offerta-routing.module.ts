import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {OffertaComponent} from "./offerta.component";



const routes: Routes = [
  {
    path:'offerta',component:OffertaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffertaRoutingModule { }
