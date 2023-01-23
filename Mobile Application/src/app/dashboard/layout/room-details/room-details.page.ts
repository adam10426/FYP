import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RoomService } from 'src/app/services/rooms/room.service';
import { DeviceService } from 'src/app/services/devices/device.service';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.page.html',
  styleUrls: ['./room-details.page.scss'],
})
export class RoomDetailsPage implements OnInit {

  roomId:any;
  devices:any;
  constructor(
    private activatedRoute : ActivatedRoute,
    private deviceService : DeviceService,
    private roomService : RoomService,
    private bluetoothService : BluetoothService
  ) { 

  }

  ngOnInit() {
  
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      this.roomId = params.id
  });
  
    // console.log(this.roomId)
    this.deviceService.fetchDevices(this.roomId)
    this.deviceService.fetchDeviceObservable().subscribe(devices=>{
      this.devices = devices
    })
  
  }
 

  async switchOnDevice(deviceInformation:any){
    const timeStamp = new Date()
    deviceInformation['timeStamp'] =  timeStamp.getTime()
    const device:any = {}
    device[deviceInformation.deviceName]=deviceInformation
    let response = await this.bluetoothService.switchSensor('1')
    if(response)
    this.deviceService.updateDevice(this.roomId,device)

    
  }

  async switchOffDevice(deviceInformation:any){
    const timeStamp = new Date()
    const switchOffTime = timeStamp.getTime()
    let upTime = switchOffTime + deviceInformation.timeStamp 
    upTime = this.convertToHours(upTime)
    const energyConsumption = this.calculatedConsumption(deviceInformation.watts,upTime)
    console.log(upTime , energyConsumption )
    deviceInformation['timeStamp'] =  switchOffTime
    deviceInformation.deviceConsumption =  deviceInformation.deviceConsumption + energyConsumption
    const device:any = {}
    device[deviceInformation.deviceName]=deviceInformation
    let response = await this.bluetoothService.switchSensor('0')
    if(response){
    await this.deviceService.updateDevice(this.roomId,device)
    this.updateRoom(energyConsumption)
    }
    
  }


    convertToHours(time:any){
      return Math.round(time/1000)%60
    }

    calculatedConsumption(power:any,upTime:any){
      return parseInt(power)*(upTime/1000)
    }



    
    async updateRoom(energyConsumption:any){
      const data:any = await this.roomService.fetchAllRooms();
      let rooms = Object.keys(data).map(room=>{
          return data[room]
      })
      

      let selectedRoom = rooms.find((room:any)=>{return room.roomId === this.roomId})
      selectedRoom['totalEnergyConsumed'] = selectedRoom['totalEnergyConsumed'] + energyConsumption
      let roomDetails:any = {}
      roomDetails[selectedRoom.roomName] = selectedRoom
      this.roomService.updateRooms(roomDetails)
     

    }
}
