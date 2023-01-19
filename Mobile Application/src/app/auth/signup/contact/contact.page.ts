import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  userContact:any= ""

  constructor(
    private navCtrl:NavController,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  moveForward(){
    const userInformation = this.authService.getAdditionalInformation()
    console.log(userInformation)
    
    userInformation['contact'] = this.userContact

    this.authService.setAdditionalInformation(userInformation)

    this.navCtrl.navigateForward(['/signup/supplier-contact'])
  }

  moveBackwards(){
    this.navCtrl.pop()
  }


}
