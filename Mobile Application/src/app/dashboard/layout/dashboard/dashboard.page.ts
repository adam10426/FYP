import { Component, OnInit,NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { BluetoothAlertComponent } from '../bluetooth-alert/bluetooth-alert.component';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/rooms/room.service';
import { AnimationOptions } from 'ngx-lottie/lib/symbols';
import { NotificationService } from 'src/app/services/notifications/notification.service';
// import { LocalNotifications } from '@capacitor/local-notifications'
// import {Plugins} from 

// import {Plugins} from '@capacitor/core'
// const {LocalNotification} = LocalNotifications

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  bluetoothDisable:boolean = true
  bluetoothEnable:any = false
  dialog:any;
  waterLevelReadings:any=0;
  options:AnimationOptions = {
    path:'../../../../assets/animations/waterLevel.json'
  }


  constructor(
    private bluetoothSerial:BluetoothSerial,
    private modalCtrl : ModalController,
    private bluetoothService : BluetoothService,
    private toastCtrl : ToastController,
    private authService:AuthService,
    private roomService : RoomService,
    private ngZone:NgZone,
    private notificationService : NotificationService
  ) { }

  async ngOnInit() {
 
    // this.notificationService.notify("Testing Notifications",'Demotics')
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
    //     // this.waterLevelReadings = readings
    //     this.ngZone.run(()=>{
    //       this.updateReadings(readings)
    //     })
        
    //     // console.log(readings)
    //   })
    // }
    // })
   
    
  }

  async promptForDeviceConnection(){
    this.dialog = await this.modalCtrl.create({
      component:BluetoothAlertComponent,
      cssClass:'bluetooth-alert-modal'  
    })

    await this.dialog.present()
  }
async updateReadings(readings:any){
  this.waterLevelReadings = readings
  // if(this.waterLevelReadings < 40 ){
  //   this.bluetoothService.switchSensor('A')

  // }
  // else if(this.waterLevelReadings >= 400 ){
  //   this.bluetoothService.switchSensor('a')
  // }
}
  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message:toastMessage,
      duration:1000
    })
    await toast.present()
  }

  testNotify(){
    // this.notificationService.notify('testing notification','Demotics')
  }
  
}
