import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContractFormModule } from 'src/app/shared/components/contract-form/contract-form.module';


@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    EditRoutingModule,
    ReactiveFormsModule,
    ContractFormModule
  ]
})
export class EditModule { }
