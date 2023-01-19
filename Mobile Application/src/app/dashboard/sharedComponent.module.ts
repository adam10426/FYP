import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './layout/footer/footer.component'
import { RouterModule } from '@angular/router';
// import { HeaderComponent } from './layout/header/header.component';
import { BluetoothAlertComponent } from './layout/bluetooth-alert/bluetooth-alert.component';
import { IonicModule } from '@ionic/angular';
// import { GeneralComponent } from './general.component'    
@NgModule({
  declarations: [GeneralModule.rootComponent],
  imports: [CommonModule,IonicModule,RouterModule],
  exports: [GeneralModule.rootComponent],
  entryComponents: [GeneralModule.rootComponent],
})
export class GeneralModule {
  static rootComponent = [FooterComponent,BluetoothAlertComponent]
}