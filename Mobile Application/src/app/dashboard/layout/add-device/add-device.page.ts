import { Component, OnInit} from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room.service';
import { untilDestroyed } from 'ngx-take-until-destroy/src';
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
  existingRooms:any = undefined
  constructor(
    private roomService : RoomService
  ) { 

 
  }

 ngOnInit() {
 this.getAllRooms()    
   

  }
  

async getAllRooms(){
  console.log("fired")
  this.roomService.getAllRooms();
  this.roomService.fetchRoomDetails().subscribe(room=>{
  console.log("getAllrooms",room)
 })    

// this.existingRooms = response?.['rooms']
    // console.log(this.existingRooms)
}


}
