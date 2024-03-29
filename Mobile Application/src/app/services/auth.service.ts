import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore,doc, setDoc } from '@angular/fire/firestore';
import { OverlayBaseController } from '@ionic/angular/util/overlay';
import { Observable,Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:any=undefined
  userAdditionalDetails:any={}
  userObservable:any = new Subject<any>;
  constructor(
    private auth:Auth,
    private firestore:Firestore
  ) { }


  async loginUser(username:any,password:any){
    try{
      await signInWithEmailAndPassword(this.auth,username,password)
      return true
    }
    catch(err){
      return false
    }
  }

  async createUser(username:any,password:any):Promise<boolean>{
    try{
    const user  = await createUserWithEmailAndPassword(this.auth,username,password)
    if(user){
    return true
    }
    else{
      return false
    }
    }
    catch(err){
      console.log(err)
      return false
    }
  }

  getCurrentUser(){
    const user = this.auth.currentUser
    console.log("auth user",user)
    this.userObservable.next(user)
    return user
  }

  
  getCurrentUserOb():Observable<any>{
    return this.userObservable.asObservable()
  }

  async storeAdditionlUserInformation(information:any){
    try{
    this.user = this.getCurrentUser()
    const userDocRef = doc(this.firestore, `users/${this.user.uid}` )
    await setDoc(userDocRef,{
      information
    })
    return true
  }
  catch(err){
    return false
  }

  }

  setAdditionalInformation(information:any){
    this.userAdditionalDetails = information
  }
  
  getAdditionalInformation(){
    return this.userAdditionalDetails
  }

}
