import { Component, OnInit } from '@angular/core';
import { BluetoothService } from 'src/app/services/bluetoothConnectivity/bluetooth.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-bluetooth-alert',
  templateUrl: './bluetooth-alert.component.html',
  styleUrls: ['./bluetooth-alert.component.scss'],
})
export class BluetoothAlertComponent implements OnInit {

  message:String = "Hello from the other side"
  constructor(
    private bluetoothService : BluetoothService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {}

  async connectBluetoothDevice(){
    const pairedDevices = await this.bluetoothService.listPairedDevices()
    this.bluetoothService.connectDevice(pairedDevices)
    
  }

}
  