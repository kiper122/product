import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PartnersComponent} from "./partners.component";



const routes: Routes = [
  {
    path:'partners',component:PartnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
