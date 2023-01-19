import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room.service';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { LoadingController, ToastController } from '@ionic/angular';
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
    // this.roomService.getAllRooms();
  this.getAllRooms()
  }
  ngOnDestroy(): void {
    // this.roomService.fetchRoomDetails()
  }

  getAllRooms(){
     this.roomService.getAllRooms()
      this.roomService.fetchRoomDetails().pipe(untilDestroyed(this)).subscribe(room=>{
     
      this.existingRooms  = room
     
    })

  }

  async checkDuplicates(){
    return  this.existingRooms.rooms.findIndex((room:any)=>room === this.roomName)
  }

  async addRooms(){
    const exsits = await this.checkDuplicates()
    
    if(exsits<0){
   this.existingRooms.rooms.push(this.roomName)
   await this.roomService.addRoom(this.existingRooms)
   this.roomName = undefined
  this.showToast('Room Added Successfully')

    }
    else{
     this.showToast('Room Already Exists')
     this.roomName = undefined
      
    }


  }


  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration : 1500
    })
    await toast.present()
  }

  
}
