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

  async addDevice(roomId:any , deviceInformation:any){
      this.user = this.authService.getCurrentUser()
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
    let data:any = undefined;
    
    response.forEach(doc=>{
      data = doc.data()
    })

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

}
