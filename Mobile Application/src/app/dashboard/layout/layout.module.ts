import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LayoutPageRoutingModule } from './layout-routing.module';
// import { FooterComponent } from './footer/footer.component';
import { GeneralModule } from '../sharedComponent.module';

import { LayoutPage } from './layout.page';

@NgModule({
  imports: [
   
    CommonModule,
    FormsModule,
    IonicModule,
    LayoutPageRoutingModule,
    GeneralModule
    // FooterComponent
  ],
  declarations: [LayoutPage]
})
export class LayoutPageModule {}
