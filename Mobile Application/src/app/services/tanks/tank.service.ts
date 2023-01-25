import { Injectable } from '@angular/core';
import { Firestore, collection , where, query,  } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { BluetoothService } from '../bluetoothConnectivity/bluetooth.service';
import {Observable, Subject} from 'rxjs'
import { documentId, getDocs } from '@firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class TankService {

  tankLevels = new Subject<any>
  tankLimits:any 

  constructor(
    private authService:AuthService,
    private fireStore:Firestore,
    private bluetoothService : BluetoothService
  ) { }



  checkTankLevels(){

  }
  
  async fetchTankLimits(){
      const user = this.authService.getCurrentUser();
      const deviceId = `${user?.uid}-waterTank`
      const document  = collection(this.fireStore,'devices');
      const q = query(document,where(documentId(),"==",deviceId));
      const response  = await getDocs(q)
      let data:any = undefined;

      response.forEach(doc=>{
        data = doc.data()
      })
      let tankDetails:any = Object.values(data)
      this.tankLimits = tankDetails[0].tankDepth
      return this.tankLimits
      // debugger
      
    }

  getTankLevels(){
    this.bluetoothService.fetchSensorReadings().subscribe(readings=>{
      this.tankLevels.next(readings);
    })
  }

  tankLevelObservable():Observable<any>{
      return this.tankLevels.asObservable();
  }
}
