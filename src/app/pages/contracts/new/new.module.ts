import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { ContractFormModule } from 'src/app/shared/components/contract-form/contract-form.module';



@NgModule({
  declarations: [
    NewComponent,
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    ContractFormModule,
  
  ]
})
export class NewModule { }
