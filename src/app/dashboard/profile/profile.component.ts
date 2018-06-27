import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from './validation.service';
import { AppDataService } from '../../app-data.service';
import { SocialUser } from '../../SocialUser';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  firstName: string;
  lastName: string;
  userForm: any;
  userdata: SocialUser = new SocialUser(); 
  constructor(private formBuilder: FormBuilder , private _ads:AppDataService) {
  // this._ads.userdata = localStorage.getItem('userdata_pwa_app', )
     this.userdata = JSON.parse(localStorage.getItem('userdata_pwa_app'));
     console.log(this.userdata);
    this.userForm = this.formBuilder.group({
      'firstName': [this.userdata.firstName, Validators.required],
      'lastName': [this.userdata.lastName, Validators.required],
      'address': ['', ],
      'city': ['', ],
      'country': ['', ],
      'email': [this.userdata.email, [Validators.required, ValidationService.emailValidator]],
      /* 'profile': ['', [Validators.required, Validators.minLength(10)]], */
      'phone': ['', ],
      'zipcode': ['', ],

    });
  }
  ngOnInit() {
    this.firstName = 'Alec';
    this.lastName = 'Thompson';
  }

  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      alert(`Name: ${this.userForm.value.firstName} Email: ${this.userForm.value.email}`);
    }
  }
}
