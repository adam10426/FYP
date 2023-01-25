import { Component, OnInit,NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { BluetoothAlertComponent } from '../bluetooth-alert/bluetooth-alert.component';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/rooms/room.service';
import { AnimationOptions } from 'ngx-lottie/lib/symbols';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { TankService } from 'src/app/services/tanks/tank.service';


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

  highLevelflag:boolean = true
  lowLevelflag:boolean = true
  midLevelflag:boolean = true

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
    private notificationService : NotificationService,
    private tankService:TankService
  ) { }

  async ngOnInit() {
  
      this.notificationService.notify("Testing Notifications",'Demotics')
      this.bluetoothService.checkBluetoothConnectivity();
      this.bluetoothService.bluetoothStatus().subscribe(status=>{
        if(status){
          this.promptForDeviceConnection()
        }
        else{
          this.showToast("Please Enable Your bluetooth")
        }
      })

    
    this.bluetoothService.btDeviceStatus().subscribe(async(isDeviceConnected)=>{
      if(isDeviceConnected){
        await this.dialog.dismiss()
        // this.tankService.getTankLevels()
        // this.tankService.tankLevelObservable().subscribe(readings=>{
        //          this.ngZone.run(()=>{
        //                   this.updateReadings(readings)
        //         })
        // })
      this.bluetoothService.fetchSensorReadings().subscribe(readings=>{
        // this.waterLevelReadings = readings
        this.ngZone.run(()=>{
          this.updateReadings(readings)
        })
        
        // console.log(readings)
      })
    }
    })
   
    
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
  const waterLevels = parseInt(this.waterLevelReadings)
  const tankLimits:any = await this.tankService.fetchTankLimits()
  this.showToast(tankLimits)
  const highLevels = parseInt(tankLimits) - 60
  const midLevels = Math.round(highLevels / 2)
  const lowLevels  =  30
  

  if(waterLevels >= highLevels ){
    this.showToast('HIgh Level')
    if(this.highLevelflag){
      this.notificationService.notify('Water Tank is filled','Water Level Indication');
    this.highLevelflag = false
    this.midLevelflag = true
    this.lowLevelflag = true
  }
  }
  else if(waterLevels >= midLevels && waterLevels < highLevels){
    this.showToast('m Level')
    if(this.midLevelflag){
    this.notificationService.notify('Water is halfway filled','Water Level Indication');
    this.highLevelflag = true
    this.midLevelflag = false
    this.lowLevelflag = true
  }
  }
  else if(waterLevels <= lowLevels ){
    this.showToast('l Level')
    if(this.lowLevelflag){
    this.notificationService.notify('Water Tank is empty','Water level Indication');
    this.highLevelflag = true
    this.midLevelflag = true
    this.lowLevelflag = false
  }
  }

 
}
  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message:toastMessage,
      duration:1000
    })
    await toast.present()
  }

  async testNotify(){
    await this.tankService.fetchTankLimits()
    await LocalNotifications.schedule({
      notifications:[{title:"helloworld",body:"testing",id:1,schedule:{at:new Date(new Date().getTime())}}]
    })
   
  }
  
}
