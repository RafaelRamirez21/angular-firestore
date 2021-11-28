import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { ContractFormModule } from './shared/components/contract-form/contract-form.module';
import { ContractFormComponent } from './shared/components/contract-form/contract-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ContractFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
