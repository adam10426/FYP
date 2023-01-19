import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private bluetoothSerial:BluetoothSerial, private toastController:ToastController) {}

ngOnInit(): void {
//  this.checkBluetooth();
}


async toast(toastMessage:any){
  
  const toast = await this.toastController.create({
    message: toastMessage,
    duration:3000
  });
  
  toast.present()
}

async listAllDevices(){
  this.toast('Will be displaying devices shortly')
  let pairedDevices = (await this.bluetoothSerial.list())
  this.toast('All devices have been collected')
  pairedDevices.map((device:any)=>{
    if(device.name === 'MASTER')
      this.toast('Welcome')
  })
}

checkBluetooth(){
  this.bluetoothSerial.isEnabled().then(async success=>{
    await this.listAllDevices()
  },failure=>{
    this.toast('Please Enable your Bluetooth and come back')
  })
}



}
