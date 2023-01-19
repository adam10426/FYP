import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  bluetoothEnabled = new Subject<any>()
  // pairedDevices = new Subject<any>()
  pairedDevices:any= []
  isDeviceConnected = new Subject<any>()
  sensorReadings = new Subject<any>()



  constructor(
    private bluetoothSerial:BluetoothSerial,
    private toastCtrl: ToastController
  ) { }


  checkBluetoothConnectivity(){
    this.bluetoothSerial.isEnabled().then(success=>{},failure=>{
      this.bluetoothSerial.enable().then(success=>{
        this.bluetoothEnabled.next(true)
      })
    })
  }


  bluetoothStatus():Observable<any>{
    return this.bluetoothEnabled.asObservable();
  }

  async listPairedDevices(){
    this.pairedDevices = (await this.bluetoothSerial.list())
    return this.pairedDevices
  }

  connectDevice(pairedDevices:any){
    pairedDevices.map((device:any)=>{
      if(device.name === 'MASTER')
      {
      this.bluetoothSerial.connect(device.address).subscribe(sucess=>{
        this.readSensorData();
        this.showToast("device has been connected")
        
        
      })
    }
    else{
      this.isDeviceConnected.next(false)
    }
    })
     
    }

  btDeviceStatus():Observable<any>{
      return this.isDeviceConnected.asObservable();
    }

  readSensorData(){
    this.showToast("Reading sesnor data")  
    this.bluetoothSerial.subscribeRawData().subscribe(success=>{      
        this.readReadings()
        
      })
    }
    
  readReadings():void{
      this.bluetoothSerial.read().then(success=>{

        this.sensorReadings.next(success)
        this.isDeviceConnected.next(true)
      })
    }

  fetchSensorReadings():Observable<any>{
      return this.sensorReadings.asObservable()
    }

    async showToast(toastMessage:any){
      const toast = await this.toastCtrl.create({
        message: toastMessage,
        duration : 1500
      })
      await toast.present()
    }
  

}
