import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, docData, getDoc ,query, where, documentId, getDocs, orderBy,collection } from '@angular/fire/firestore';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Observable,Subject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import * as uuid from "uuid"
// import { SMS } from '@ionic-native/sms';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
user:any;
notificationList = new Subject<any>;
  constructor(
    private toastCtrl :ToastController,
    private db:Firestore,
    private authService : AuthService
  ) { 
     
  }
  

  async notify(notificationMessage:any,notificationTitle:any){
    
    await LocalNotifications.schedule({
      notifications:[{title:notificationTitle,body:notificationMessage,id:1,schedule:{at:new Date(new Date().getTime()+1000)}}]
    })

    LocalNotifications.addListener('localNotificationActionPerformed', (payload) => {
      // this.sms.send('03151115512',"helloworld");

      // use route to redirect
});

    // this.showToast('notification triggered')
  }



  async showToast(toastMessage:any){
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration : 1500
    })
    await toast.present()
  }

  async addNotification(notificationMessage:String,notificationTitle:String){
    let notificationDetail:any = {}
    notificationDetail['timestamp'] = new Date()
    notificationDetail['text'] = notificationMessage
    notificationDetail['title'] = notificationTitle
    let notification:any = {}
    notification[uuid.v4()] = notificationDetail


  this.user = this.authService.getCurrentUser();
  const notificationDocRef = doc(this.db,`notifications/${this.user.uid}`) 
  await setDoc(notificationDocRef,notification,{ merge:true })


  }

  async getNotification(){
    this.user   =  this.authService.getCurrentUser()
    let notificationList:any = []
    const notificationCollection  =  collection(this.db,'notifications')
    const q = query(notificationCollection,where(documentId(),"==",this.user.uid));
    const response = await getDocs(q)
    let notifications:any = undefined ;
    response.forEach(doc=>{
      notifications = doc.data()
    })

    Object.keys(notifications).map(key=>{
    notificationList.push(notifications[key]) 
  })

  notificationList = notificationList.sort((a:any,b:any)=> new Date(b.timestamp.toDate()).getTime() -  new Date(a.timestamp.toDate()).getTime())
  this.notificationList.next(notificationList)
  
  
  }

  fetchNotification():Observable<any>{
    return this.notificationList.asObservable()
  }
 

}
