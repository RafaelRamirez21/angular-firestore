import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkerFormComponent } from './worker-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkerFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule   
  ],
  exports:[WorkerFormComponent]
})
export class WorkerFormModule { }
