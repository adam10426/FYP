import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.page.html',
  styleUrls: ['./layout.page.scss'],
})
export class LayoutPage implements OnInit {
  navigation:any=[
{
  routePath:'/layout/edit-profile',
  routeName:'Profile'
},
{
  routePath:'/layout/add-device',
  routeName:'Devices'
},
{
  routePath:'/layout/add-room',
  routeName:'Rooms'
}
  ]

  private pairedDevices:any = []




  constructor(
    private navCtrl:NavController,
    private bluetoothSerial:BluetoothSerial,
    private toastController:ToastController

  ) { }

  ngOnInit() {
    // this.listAllDevices()
  // this.navCtrl.navigateForward(['/layout/main'])
  }


  // readReadings():void{
  //   this.bluetoothSerial.read().then(success=>{
  //     this.toast('reading data 2')
  //     this.toast(success)
  //   },failure=>{
  //     this.toast(failure)
  //   })
  // }


  // async toast(toastMessage:any){
  
  //   const toast = await this.toastController.create({
  //     message: toastMessage,
  //     duration:3000
  //   });
    
  //   toast.present()
  // }

  // async listAllDevices(){
  //   this.toast('Will be displaying devices shortly')
  //   this.pairedDevices = (await this.bluetoothSerial.list())
  //   this.toast('All devices have been collected')
    
  // }
  
  // connectDevice(){
  //   this.pairedDevices.map((device:any)=>{
  //     if(device.name === 'MASTER')
  //     this.bluetoothSerial.connect(device.address).subscribe(sucess=>{
        
  //       this.toast('Device has been connected')
  //     })
  //   })
     
  //   }

  // deviceConnected(){
  //     this.bluetoothSerial.subscribeRawData().subscribe(success=>{
  //       this.toast("reading data")
  //       this.readReadings()
  //       this.toast(success)
  //     },failure=>{
  //       this.toast("error Please check you code again")
  //     })
  //   }
}
