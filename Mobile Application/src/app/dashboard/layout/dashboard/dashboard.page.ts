import { Component, OnInit } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { BluetoothAlertComponent } from '../bluetooth-alert/bluetooth-alert.component';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/rooms/room.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  bluetoothDisable:boolean = true
  bluetoothEnable:any = false
  dialog:any;
  waterLevelReadings:any=70;
  constructor(
    private bluetoothSerial:BluetoothSerial,
    private modalCtrl : ModalController,
    private bluetoothService : BluetoothService,
    private toastCtrl : ToastController,
    private authService:AuthService,
    private roomService : RoomService
  ) { }

  ngOnInit() {
    // this.bluetoothService.checkBluetoothConnectivity();
    // this.bluetoothService.bluetoothStatus().subscribe(status=>{
    //   if(status){
    //     this.promptForDeviceConnection()
    //   }
    //   else{
    //     this.showToast("Please Enable Your bluetooth")
    //   }
    // })
    // this.bluetoothService.btDeviceStatus().subscribe(async(isDeviceConnected)=>{
    //   if(isDeviceConnected){
    //     await this.dialog.dismiss()
    //   this.bluetoothService.fetchSensorReadings().subscribe(readings=>{
    //     this.showToast(readings)
    //   })
    // }
    // })
    // this.authService.getCurrentUser()
    // this.roomService.getAllRooms();
    
  }

  async promptForDeviceConnection(){
    this.dialog = await this.modalCtrl.create({
      component:BluetoothAlertComponent,
      cssClass:'bluetooth-alert-modal'  
    })

    await this.dialog.present()
  }

  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message:toastMessage,
      duration:1000
    })
    await toast.present()
  }
  
}
