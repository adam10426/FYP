import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    conformPassword : new FormControl('')
  })

  // conformPassword = ''

  constructor(
    // private router: Router,
    private navCtrl:NavController,
    private authService:AuthService,
    // private loadingController: LoadingController,
    ) { }

  ngOnInit() {
  }

  async signUp(){
    if(this.signupForm.value.password === this.signupForm.value.conformPassword){
      this.authService.setAdditionalInformation({"email":this.signupForm.value.email,"password":this.signupForm.value.password,"firstName":this.signupForm.value.firstName,"lastName":this.signupForm.value.lastName})
      this.navCtrl.navigateForward(['/signup/address'])
    }
    else{
      console.log('Password does not match')
    }
    
  }

  redirectToLogin(){
    this.navCtrl.navigateForward(['/login'])
  }

}
