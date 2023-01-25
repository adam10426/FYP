import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private toastCtrl :ToastController
  ) { 
     
  }
  

  async notify(notificationMessage:any,notificationTitle:any){
    
    await LocalNotifications.schedule({
      notifications:[{title:notificationTitle,body:notificationMessage,id:1,schedule:{at:new Date(new Date().getTime()+3000)}}]
    })

    this.showToast('notification triggered')
  }



  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration : 1500
    })
    await toast.present()
  }
}
