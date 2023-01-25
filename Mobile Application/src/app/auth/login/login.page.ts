import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NavController,ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm = new FormGroup({
    user : new FormControl(''),
    password: new FormControl('')
  })
  constructor(
    private authService:AuthService,
    private navCtrl:NavController,
    private toastCtrl:ToastController
  ) { }

  ngOnInit() {
  }

  async login(){
    const response = await this.authService.loginUser(this.loginForm.value.user,this.loginForm.value.password)
    if (response){
      this.navCtrl.navigateForward(['/layout/dashboard'])
    }
    else{
      this.invalidCredentials('Invalid Credentials')
    }
  }

  async invalidCredentials(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message:toastMessage,
      duration:1000
    }) 
    await toast.present()
  }

  redirectToSignUp(){
    this.navCtrl.navigateForward(['/signup'])
  }
}
