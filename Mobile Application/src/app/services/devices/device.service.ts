import { Injectable } from '@angular/core';
import {async, Observable, Subject} from 'rxjs'
import { AuthService } from '../auth.service';
import { RoomService } from '../rooms/room.service';

import { Firestore,setDoc,doc,collection,query,where,getDocs, documentId, updateDoc } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  user:any;
  deviceList = new Subject<any>
  constructor(
    private authService: AuthService,
    private db : Firestore,
    private roomService : RoomService

  ) { }

  async addDevice(roomId:any , deviceInformation:any, deviceName:any = "waterTank"){
      this.user = this.authService.getCurrentUser()
      
      deviceInformation[deviceName]['userUUID'] = this.user.uid 
      const deviceId = `${this.user.uid}-${roomId}` 
      const docRef = doc(this.db,`devices/${deviceId}`)
      await setDoc(docRef,deviceInformation,{merge:true})
  }

  async fetchDevices(roomId:any){
    this.user = this.authService.getCurrentUser();
    const deviceId = `${this.user.uid}-${roomId}`
    const document  = collection(this.db,`devices`)
    const q = query(document,where(documentId(),"==",deviceId))
    const response  = await getDocs(q)
    let data:any = [];
    
    response.forEach(doc=>{
      // data.push(doc.data())
      data = doc.data()
    })

    // debugger;

   const deviceList = Object.keys(data).map(device=>{
    return data[device]
   })
 
   this.deviceList.next(deviceList)
   
    // debugger
  }

    fetchDeviceObservable():Observable<any>{
      return this.deviceList.asObservable();
    }

    async updateDevice(roomId:any,deviceInformation:any){
      this.user = this.authService.getCurrentUser()
      const deviceId = `${this.user.uid}-${roomId}` 
      const docRef = doc(this.db,`devices/${deviceId}`)
      await updateDoc(docRef,deviceInformation)
    }

    async checkDuplicates(deviceName:any=undefined,devicePin:any=undefined){
      
      let deviceList:any = []
      let deviceExsist:any = [] ;
      let pinExsist:any = [];
      this.user = this.authService.getCurrentUser();
      const document  = collection(this.db,`devices`)
      const response  = await getDocs(document)
      let data:any = [];
      
      response.forEach(doc=>{
        data.push(doc.data())
      })

      data.forEach((device:any)=>{Object.keys(device).map(key=>{
        deviceList.push(device[key])
    })})
  
      deviceExsist = deviceList.filter((device:any)=>{return device.userUUID === this.user.uid && device.deviceName === deviceName})
      pinExsist = deviceList.filter((device:any)=>{return device.userUUID === this.user.uid && device.pin === devicePin})
    
    if(deviceExsist.length > 0 && pinExsist.length > 0){
      console.log("Device Name and Pin already Taken")
      deviceExsist = undefined
      pinExsist = undefined
      return false
    }
    else if(pinExsist.length > 0){
      console.log("Pin already Taken")
      deviceExsist = undefined
      pinExsist = undefined
      return false
    }
    else if(deviceExsist.length > 0){
      console.log("Device already Taken")
      deviceExsist = undefined
      pinExsist = undefined
      return false
    }

    return true


      // debugger;
  
    //  const deviceList = Object.keys(data).map(device=>{
    //   return data[device]
    //  })
  
    //  this.deviceList.next(deviceList)
     
      // debugger
    }

    async checkMotorAutomation(){
      let deviceList:any = []
      this.user = this.authService.getCurrentUser();
      const document  = collection(this.db,`devices`)
      const q  = query(document,where(documentId(),"==",`${this.user.uid}-waterMotor`))
      const response  = await getDocs(q)
      let data:any = [];
      
      response.forEach(doc=>{
        data.push(doc.data())
      })

      data.forEach((device:any)=>{Object.keys(device).map(key=>{
        deviceList.push(device[key])
    })})

    return deviceList[0]
  
    }
}
