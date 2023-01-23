import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfilePageRoutingModule } from './edit-profile-routing.module';
import { GeneralModule } from '../../sharedComponent.module';
// import { FooterComponent } from '../footer/footer.component';

import { EditProfilePage } from './edit-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneralModule,
    EditProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditProfilePage]
})
export class EditProfilePageModule {}
