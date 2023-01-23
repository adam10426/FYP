import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  rooms :any = []

  constructor(
    private roomService : RoomService,
    private router : Router
  ) { }

  ngOnInit() {

    this.roomService.fetchRoomListObject();
    this.roomService.fetchAllRoomsObservable().subscribe(rooms=>{
      this.rooms = Object.keys(rooms).map((room:any)=>{
        return rooms[room]
      })

     
    })
    
    
  }

  redirect(roomId:any){
    console.log(roomId)
    this.router.navigate(['/layout/room-details'],{
      queryParams:{id:roomId}
      })
  }

}
