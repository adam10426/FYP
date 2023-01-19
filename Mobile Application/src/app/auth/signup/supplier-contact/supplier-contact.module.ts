import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierContactPageRoutingModule } from './supplier-contact-routing.module';

import { SupplierContactPage } from './supplier-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupplierContactPageRoutingModule
  ],
  declarations: [SupplierContactPage]
})
export class SupplierContactPageModule {}
