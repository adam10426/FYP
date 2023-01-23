import { Injectable } from '@angular/core';
// import { ILocalNotificationActionType } from '@ionic-native/local-notifications';
// import { ELocalNotificationTriggerUnit, LocalNotifications,ILocalNotification } from '@ionic-native/local-notifications/ngx';
import { Platform, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    // private notification:LocalNotifications,
    private plt:Platform,
    private toastCtrl :ToastController
  ) { 
      // this.plt.ready().then(ready=>{
      //    this.notification.on('click').subscribe((res)=>{
      //     console.log(res)
      //    })
      // })
  }


  // async notify(notificationMessage:any,notificationTitle:any){
  //   let options :ILocalNotification = {
      
        
  //       title:notificationTitle,
  //       text:notificationMessage,
  //       data:{ },
  //       trigger:{at:new Date(new Date().getTime()+3000)}
      
  //   }
  //   await this.notification.schedule(options)
  //   this.showToast('notification triggered')
  // }



  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration : 1500
    })
    await toast.present()
  }
}
