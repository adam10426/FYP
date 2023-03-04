import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notifications/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notificationList:any=[
    // {
    //   title:"Water Level Indication",
    //   text:"Testing notification",
    //   timestamp: new Date()
    // }
  ]
  constructor(
    private notificationService:NotificationService
  ) {
   
   }

  ngOnInit() {
    this.notificationService.getNotification();
    this.notificationService.fetchNotification().subscribe((notification)=>{
     this.notificationList = notification
    }) 
  }

}
