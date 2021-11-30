import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract.component';
import { HttpClientModule } from "@angular/common/http";
@NgModule({
  declarations: [
    ContractComponent
  ],
  imports: [
    CommonModule,
    ContractRoutingModule,
    HttpClientModule
   
  ]
})
export class ContractModule { }
