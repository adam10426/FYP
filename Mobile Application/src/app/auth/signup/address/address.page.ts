import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {

  userAddress:any= ""

  constructor(
    private navCtrl:NavController,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  moveForward(){

    const userInformation = this.authService.getAdditionalInformation()
    
    userInformation['address'] = this.userAddress

    this.authService.setAdditionalInformation(userInformation)

    this.navCtrl.navigateForward(['/signup/contact'])
  }

  moveBackwards(){
    this.navCtrl.pop()
  }


}
