import { Component, OnInit} from '@angular/core';
import { RoomService } from 'src/app/services/rooms/room.service';
import { DeviceService } from 'src/app/services/devices/device.service';
@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.page.html',
  styleUrls: ['./add-device.page.scss'],
})
export class AddDevicePage implements OnInit {
  existingRooms:any = undefined
  
  addDevice = {
    deviceType:"waterLevelSensor",
    room:'',
    deviceName:"",
    watts:"",
    tankDepth:"",
    pin:'',
    userUUID:'',
    deviceConsumption:0,
    automationStatus:false,
    status:false
  }

  constructor(
    private roomService : RoomService,
    private deviceService : DeviceService
  ) { 

 
  }

 ngOnInit() {

 this.listRooms()    
   

  }
  
listRooms(){
  this.roomService.fetchRoomList()
  this.roomService.fetchRoomDetails().subscribe(room=>{
  this.existingRooms = [...room]
  this.addDevice.room = this.existingRooms[0].roomId

    
 })    


}

async addDevices(){
  const deviceInformation:any = {}
  if(this.addDevice.deviceType != 'waterLevelSensor' && this.addDevice.deviceType != 'waterMotor'){
  deviceInformation[this.addDevice.deviceName] = this.addDevice

  const response  = await this.deviceService.checkDuplicates(this.addDevice.deviceName,this.addDevice.pin)
  if(response === true){
  await this.deviceService.addDevice(this.addDevice.room,deviceInformation,this.addDevice.deviceName)
  this.clearDeviceInput()
  this.updateRoom()
  }


}
else if(this.addDevice.deviceType != "waterLevelSensor" && this.addDevice.deviceType === "waterMotor" ){
  deviceInformation[this.addDevice.deviceName] = this.addDevice
  await this.deviceService.addDevice('waterMotor',deviceInformation,this.addDevice.deviceName)
  this.clearDeviceInput()
}
else{
  deviceInformation[this.addDevice.deviceName] = this.addDevice
  await this.deviceService.addDevice('waterTank',deviceInformation,this.addDevice.deviceName)
  this.clearDeviceInput()
}

}

async updateRoom(){
  const data:any = await this.roomService.fetchAllRooms();
  let rooms = Object.keys(data).map(room=>{
      return data[room]
  })
  let selectedRoom = rooms.find((room:any)=>{return room.roomId === this.addDevice.room})
  selectedRoom['totalDeviceRegsitered'] = selectedRoom['totalDeviceRegsitered'] + 1
  let roomDetails:any = {}
  roomDetails[selectedRoom.roomName] = selectedRoom
  this.roomService.updateRooms(roomDetails)
  

}


clearDeviceInput(){
  this.addDevice.deviceName = ''
  this.addDevice.watts = ''
  this.addDevice.pin = ''
  this.addDevice.tankDepth=''
  this.addDevice.automationStatus = false
}


checkDuplicates(){
  
}

getRoomName(){
  const roomDetails = this.existingRooms.find((x:any)=>x.roomId === this.addDevice.room)
  return roomDetails?.roomName
}

}
