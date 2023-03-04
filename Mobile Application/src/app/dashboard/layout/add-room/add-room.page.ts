import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LoadingController, ToastController } from '@ionic/angular';
import * as uuid from "uuid"
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.page.html',
  styleUrls: ['./add-room.page.scss'],
})
export class AddRoomPage implements OnInit,OnDestroy {

  roomName:any=''
  existingRooms:any=[]
  constructor(
    private roomService: RoomService,
    private loadingCtrl: LoadingController,
    private toastCtrl : ToastController
  ) { }

  ngOnInit() {
    
  this.getAllRooms()
  }
  ngOnDestroy(): void {
   
  }

  getAllRooms(){
     this.roomService.getAllRooms()
      this.roomService.fetchRoomDetails().pipe(untilDestroyed(this)).subscribe(room=>{
      this.existingRooms  = room
     
    })

  }

  async checkDuplicates(rooms:any){
    return rooms.find((room:any)=>{return room.roomName === this.roomName})
  }




  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration : 1500
    })
    await toast.present()
  }

  async test(){
    let exsist = false;
    let response = await this.roomService.fetchAllRooms();
    
    if(response){
    let data = Object.keys(response).map((room:any)=>{
      return response[room]
    })
    
    exsist = await this.checkDuplicates(data)
  }
    if(exsist){
      console.log("room already exists")
    }
    else{
      
      let roomDetails:any = {}
        roomDetails[this.roomName] = {
        roomName : this.roomName,
        totalDeviceRegsitered : 0,
        totalEnergyConsumed : 0,
        roomId : uuid.v4()
      }
    
      await this.roomService.addRoom(roomDetails)
    
    }
  }
  
}
