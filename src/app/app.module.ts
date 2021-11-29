import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HeaderModule } from './shared/components/header/header.module';
import { ContractFormModule } from './shared/components/contract-form/contract-form.module';
import{AngularFireModule} from '@angular/fire';
import{AngularFirestore} from '@angular/fire/firestore';

import { environment } from 'src/environments/environment';
import { WorkerFormComponent } from './shared/components/worker-form/worker-form.component';
import { WorkerFormModule } from './shared/components/worker-form/worker-form.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    ContractFormModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    WorkerFormModule
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
