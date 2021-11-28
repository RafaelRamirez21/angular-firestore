import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ { path: 'new', loadChildren: () => import('./pages/contracts/new/new.module').then(m => m.NewModule) }, { path: 'contracts', loadChildren: () => import('./pages/contracts/contract/contract.module').then(m => m.ContractModule) }, { path: 'details', loadChildren: () => import('./pages/contracts/details/details.module').then(m => m.DetailsModule) }, { path: 'edit', loadChildren: () => import('./pages/contracts/edit/edit.module').then(m => m.EditModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
