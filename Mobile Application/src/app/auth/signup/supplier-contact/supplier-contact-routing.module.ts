import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierContactPage } from './supplier-contact.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierContactPageRoutingModule {}
