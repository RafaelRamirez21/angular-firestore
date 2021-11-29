import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { WorkerFormModule } from 'src/app/shared/components/worker-form/worker-form.module';


@NgModule({
  declarations: [
    NewComponent
    
  ],
  imports: [
    CommonModule,
    NewRoutingModule,
    WorkerFormModule
  ]
})
export class NewModule { }
