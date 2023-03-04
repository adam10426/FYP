import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GeneralModule } from '../../sharedComponent.module';
import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web'

export function playerFactory(){
  return player
}
@NgModule({
  imports: [
    LottieModule.forRoot({player:playerFactory}),
    // BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    GeneralModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
