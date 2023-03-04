import { Component, OnInit,NgZone } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ModalController, ToastController } from '@ionic/angular';
import { BluetoothAlertComponent } from '../bluetooth-alert/bluetooth-alert.component';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/rooms/room.service';
// import { AnimationOptions } from 'ngx-lottie/lib/symbols';
import { NotificationService } from 'src/app/services/notifications/notification.service';
import { LocalNotifications } from '@capacitor/local-notifications';
import { TankService } from 'src/app/services/tanks/tank.service';
import { DeviceService } from 'src/app/services/devices/device.service';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  bluetoothDisable:boolean = true
  bluetoothEnable:any = false
  time:any;
  dialog:any;
  waterLevelReadings:any=0;
  waterLevelPercentage:any=80;
  tankLimits:any = 0;

  highLevelflag:boolean = true
  lowLevelflag:boolean = true
  midLevelflag:boolean = true

  motorAutomation:any;
  motorStatus:boolean=false;
  motorAutomationStatus:boolean=false;

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
    private deviceService:DeviceService,
    private notificationService : NotificationService,
    private tankService:TankService
  ) { 

    this.time = new Date()
  }

  async ngOnInit() {
    this.tankLimits = await this.tankService.fetchTankLimits()
    this.motorAutomation = await this.deviceService.checkMotorAutomation()
    this.motorAutomationStatus = this.motorAutomation.automationStatus
    this.motorStatus = this.motorAutomation.status
      this.notificationService.notify("Testing Notifications",'Demotics')
      this.bluetoothService.checkBluetoothConnectivity();
      this.bluetoothService.bluetoothStatus().subscribe(status=>{
        if(status){
          this.promptForDeviceConnection()
        }
        else{
          // this.showToast("Please Enable Your bluetooth")
        }
      })

    
    this.bluetoothService.btDeviceStatus().subscribe(async(isDeviceConnected)=>{
      
      
      if(isDeviceConnected){
        await this.dialog.dismiss()
       
      this.bluetoothService.fetchSensorReadings().subscribe(readings=>{
       
        this.ngZone.run(()=>{
          this.time = new Date()
          this.updateReadings(readings)
        })
        
        
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

  const waterLevels = parseInt(this.waterLevelReadings)-4

  this.waterLevelPercentage = Math.abs(100-((waterLevels/this.tankLimits)*100))
  this.waterLevelPercentage = this.waterLevelPercentage
  // this.showToast(this.waterLevelPercentage)
  if(this.waterLevelPercentage >= 80 ){

    this.motorAutomation = await this.deviceService.checkMotorAutomation()
    this.motorAutomationStatus = this.motorAutomation.automationStatus
    await this.bluetoothService.switchSensor(parseInt(this.motorAutomation.pin) ,false)
    this.motorStatus = false

    // this.showToast('h Level')
    if(this.highLevelflag){
      this.notificationService.notify('Water Tank is filled','Water Level Indication');
      this.notificationService.addNotification("Water pump has been turned Off","Water Level Indication")
      this.notificationService.addNotification("Water Tank is filled","Water Level Indication")
    this.highLevelflag = false
    this.midLevelflag = true
    this.lowLevelflag = true
    // console.log(waterLevelPercentage)
  }
  }
  else if(this.waterLevelPercentage >=45 && this.waterLevelPercentage<60){
    // this.showToast('m Level')
    if(this.midLevelflag){
    this.notificationService.notify('Water is halfway filled','Water Level Indication');
    this.notificationService.addNotification("Water is halfway filled","Water Level Indication")
    this.highLevelflag = true
    this.midLevelflag = false
    this.lowLevelflag = true
  }
  }
  else if(this.waterLevelPercentage <= 10 ){
    // this.showToast('l Level')
    if(this.lowLevelflag){
      this.motorAutomation = await this.deviceService.checkMotorAutomation()
      if(this.motorAutomation.automationStatus){
        this.motorStatus = true
        this.bluetoothService.switchSensor(parseInt(this.motorAutomation.pin) ,true)
        this.notificationService.notify('Water Tank is empty','Motor has been started');
      this.notificationService.addNotification("Motor has been started","Water Level Indication")
      this.notificationService.addNotification("Water Tank is Empty","Water Level Indication")

      }
      else{
        this.motorAutomationStatus = this.motorAutomation.automationStatus
        this.notificationService.notify('Please Contact Your Supplier','Demotice');
        this.notificationService.addNotification("Please Contact Your Supplier","Water Level Indication")
      this.notificationService.addNotification("Water Tank is Empty","Water Level Indication")

      }
      this.highLevelflag = true
      this.midLevelflag = true
      this.lowLevelflag = false
    
    
  }
  }

 
}

async switchMotor(){

  this.motorAutomation.status = !this.motorAutomation.status
  this.motorStatus = this.motorAutomation.status
  

  let motorDetails:any = {}
  motorDetails['motor1'] = this.motorAutomation

  await this.bluetoothService.switchSensor(this.motorAutomation.pin,this.motorAutomation.status)
  await this.deviceService.updateDevice('waterMotor',motorDetails)
  
  if(this.motorStatus){
    await this.notificationService.addNotification("Water pump has been turned on",`${this.motorAutomation.deviceName}`)
    
  }
  else{
    await this.notificationService.addNotification("Water pump has been turned off",`${this.motorAutomation.deviceName}`)
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

  async updateMotorAutomationStatus(){
    this.motorAutomation.automationStatus = !this.motorAutomation.automationStatus
    this.motorAutomationStatus = this.motorAutomation.automationStatus
    let motorDetails:any = {}
    motorDetails['motor1'] = this.motorAutomation

    await this.deviceService.updateDevice('waterMotor',motorDetails)
    if(this.motorAutomationStatus){
      await this.notificationService.addNotification("Water pump automation has been turned on",`${this.motorAutomation.deviceName}`)
      
    }
    else{
      await this.notificationService.addNotification("Water pump automation has been turned off",`${this.motorAutomation.deviceName}`)
    }
    
  }

  
}
