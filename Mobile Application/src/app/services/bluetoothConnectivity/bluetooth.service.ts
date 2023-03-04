import { Injectable } from '@angular/core';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { ToastController } from '@ionic/angular';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BluetoothService {

  bluetoothEnabled = new Subject<any>()
  pairedDevices:any= []
  isDeviceConnected = new Subject<any>()
  sensorReadings = new Subject<any>()



  constructor(
    private bluetoothSerial:BluetoothSerial,
    private toastCtrl: ToastController
  ) { }


  checkBluetoothConnectivity(){
    this.bluetoothSerial.isEnabled().then(success=>{
      this.bluetoothEnabled.next(true)
    },failure=>{
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
      this.bluetoothSerial.connect(device.address).subscribe(success=>{
        this.readSensorData()
        // this.isDeviceConnected.next(true)
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
    // this.showToast("Reading sesnor data")  
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

    async switchSensor(pin:any,status:any){
      // console.log(pin,status)
      if(pin === 6 && status === true )
        await this.bluetoothSerial.write('A')
      else if(pin === 6 && status === false )
      await this.bluetoothSerial.write('a')

      if(pin === 7 && status )
      await this.bluetoothSerial.write('B')
      else if(pin === 7 && !status )
      await this.bluetoothSerial.write('b')

      if(pin === 8 && status )
      await this.bluetoothSerial.write('C')
      else if(pin === 8 && !status )
      await this.bluetoothSerial.write('c')

      if(pin === 9 && status )
      await this.bluetoothSerial.write('D')
      else if(pin === 9 && !status )
      await this.bluetoothSerial.write('d')

      if(pin === 10 && status )
      await this.bluetoothSerial.write('E')
      else if(pin === 10 && !status )
      await this.bluetoothSerial.write('e')
    
      if(pin === 11 && status )
      await this.bluetoothSerial.write('F')
      else if(pin === 11 && !status )
      await this.bluetoothSerial.write('f')

      // if(this.bluetoothEnabled){
        
      // await this.bluetoothSerial.write(option)
      // this.showToast("write operation completed")
      // return true
      // }
      // else{
      //   this.showToast("Bluetooth device not connected")
      //   return false
      // }
    }
 
    async showToast(toastMessage:any){
      const toast = await this.toastCtrl.create({
        message: toastMessage,
        duration : 1500
      })
      await toast.present()
    }
  

}
