import { Injectable } from '@angular/core';
import { Firestore,doc, setDoc, docData, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Observable,Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
 user:any = undefined
 roomData:any = undefined
 rooms:any = new Subject<any>


  constructor(
    
    private authService: AuthService,
    private fireStore : Firestore
  ) { 

    
  }

 async addRoom(rooms:any){
  this.authService.getCurrentUser();
  this.authService.getCurrentUserOb().subscribe(async(user)=>{
    const roomDocRef = doc(this.fireStore,`rooms/${user.uid}`) 
    await setDoc(roomDocRef,rooms)
  })
 
 }

 getAllRooms(){

  this.authService.getCurrentUser();
  this.authService.getCurrentUserOb().subscribe(async(user)=>{
  const roomDocRef = doc(this.fireStore,'rooms',user.uid) 
  console.log("rooms 39 rooms Service")
  const response = await getDoc(roomDocRef)
  this.rooms.next(response.data())
  })
 }

 fetchRoomDetails():Observable<any>{
  return this.rooms.asObservable()
 }
 
 

}
