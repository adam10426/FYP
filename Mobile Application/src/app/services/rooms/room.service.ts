import { Injectable } from '@angular/core';
import { Firestore,doc, setDoc, docData, getDoc, collection ,query, where, documentId, getDocs, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth.service';
import { Observable,Subject } from 'rxjs';
import * as uuid from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class RoomService {
 user:any = undefined
 roomData:any = undefined
 rooms:any = new Subject<any>
 roomObjectList:any = new Subject<any>


  constructor(
    
    private authService: AuthService,
    private fireStore : Firestore
  ) { 

    
  }

 async addRoom(rooms:any){
  this.user = this.authService.getCurrentUser();
  const roomDocRef = doc(this.fireStore,`rooms/${this.user.uid}`) 
  await setDoc(roomDocRef,rooms,{ merge:true })
 }

 getAllRooms(){

  this.user = this.authService.getCurrentUser();
  // this.authService.getCurrentUserOb().subscribe(async(user)=>{
  // const roomDocRef = doc(this.fireStore,'rooms',user.uid) 
  // console.log("rooms 39 rooms Service")
  // const response = await getDoc(roomDocRef)
  // this.rooms.next(response.data())
  // })
  
 }

 async fetchRoomList(){
  this.user = this.authService.getCurrentUser()
  const db = collection(this.fireStore,'rooms')
  const q = query(collection(this.fireStore,'rooms'),where(documentId(),"==",this.user.uid))
  const response = await getDocs(q)
  let data:any = undefined ;
  response.forEach(doc=>{
    data = doc.data()
  })

  const roomNames = Object.keys(data).map(room=>{
    return {roomName : data[room].roomName, roomId:data[room].roomId }
  })

  this.rooms.next(roomNames)

 }

 async fetchRoomListObject(){
  this.user = this.authService.getCurrentUser()
  const db = collection(this.fireStore,'rooms')
  const q = query(collection(this.fireStore,'rooms'),where(documentId(),"==",this.user.uid))
  const response = await getDocs(q)
  let data:any = undefined ;
  response.forEach(doc=>{
    data = doc.data()
  })

  this.roomObjectList.next(data)
  

 }

 fetchRoomDetails():Observable<any>{
  return this.rooms.asObservable()
 }

 fetchAllRoomsObservable():Observable<any>{
  return this.roomObjectList.asObservable();
 }

 async fetchAllRooms(){
  this.user = this.authService.getCurrentUser()
  const db = collection(this.fireStore,'rooms')
  const q = query(collection(this.fireStore,'rooms'),where(documentId(),"==",this.user.uid))
  const response = await getDocs(q)
  let data:any = undefined ;
  response.forEach(doc=>{
    data = doc.data()
  })
  
  return data
}
 
async updateRooms(roomDetails:any){
  this.user = this.authService.getCurrentUser()
  const docRef = doc(this.fireStore,`rooms/${this.user.uid}`)
  await updateDoc(docRef,roomDetails)
}
 

}
