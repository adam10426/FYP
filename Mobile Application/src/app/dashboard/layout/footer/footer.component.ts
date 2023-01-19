import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  activeAddButton:boolean= false;

  navigation:any=[
    {
      routePath:'/layout/dashboard',
      routeName:'Home'
    },
    {
      routePath:'/layout/edit-profile',
      routeName:'Profile'
    },
    {
      routePath:'#',
      routeName:'Devices'
    },
    {
      routePath:'#',
      routeName:'Rooms'
    },
    {
      routePath:'#',
      routeName:''
    }
      ]

  constructor(
    private navCtrl:NavController
  ) { }

  ngOnInit() {}

  activateButton(){
    this.activeAddButton = !this.activeAddButton;
  }
    // redirectToEditProfile(){
    //   console.log('routing')
    //   this.navCtrl.navigateForward(['/layout/edit-profile'])
    // }
}
