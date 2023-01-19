import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-supplier-contact',
  templateUrl: './supplier-contact.page.html',
  styleUrls: ['./supplier-contact.page.scss'],
})
export class SupplierContactPage implements OnInit {
  supplierContact:any= undefined
  constructor(

    private navCtrl:NavController,
    private authService:AuthService,
    private loadingController:LoadingController,
  ) { }

  ngOnInit() {
  }

  async signUp(){
    const userInformation = this.authService.getAdditionalInformation()
    // console.log(userInformation)
    
    userInformation['supplierContact'] = this.supplierContact

    const loading  = await this.loadingController.create()
    await loading.present()


    let response  = await this.authService.createUser(userInformation.email,userInformation.password)
   

    if(response)
    {
            await this.authService.storeAdditionlUserInformation(userInformation)
            await loading.dismiss()
            this.navCtrl.navigateForward(['/login'])
    }
    
  }

  moveBackwards(){
    this.navCtrl.pop()
  }

}
