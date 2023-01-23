import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup,FormControl } from '@angular/forms'; 

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  user:any;
  updatedUserDetails:any={}
  
  constructor(
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.user  = await this.authService.getUserDetails()
    
    this.updatedUserDetails.firstName = this.user.firstName
    this.updatedUserDetails.lastName = this.user.lastName
    this.updatedUserDetails.address = this.user.address
    this.updatedUserDetails.contact = this.user.contact
    this.updatedUserDetails.supplierContact = this.user.supplierContact

}


async updateUserInformation(){
  let details:any = {}
  details['information'] = this.updatedUserDetails
  await this.authService.updateUser(details)
  console.log('User has been updated')
}


}
