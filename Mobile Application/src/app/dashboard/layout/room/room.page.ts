import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  rooms = [
    {
      roomName : "Bedroom",
      devicesConnected: 1,
      energyConsumption: 45
    },
    {
      roomName : "Living Room",
      devicesConnected: 3,
      energyConsumption:56
    },
    {
      roomName : "Drawing Room",
      devicesConnected: 10,
      energyConsumption: 120
    },
    {
      roomName : "Kitchen",
      devicesConnected: 0,
      energyConsumption: 0
    },
  ]



  constructor() { }

  ngOnInit() {
  }

}
