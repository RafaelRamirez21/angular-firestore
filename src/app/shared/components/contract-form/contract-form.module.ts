import {  NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractFormComponent } from './contract-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ContractFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule   
  ],
  exports:[ContractFormComponent]
 
})
export class ContractFormModule { }
