import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  public user : User;

  public users : User[];

  signupForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    position: ['', [Validators.required]],
    gender: ['H', ],
    birthdate: ['', ],
    birthplace: ['', ],
    department: ['', ],
    address: ['', ],
    phone: ['', ],
    endDate: ['', ],
  });
  errorMessage: string;
  genders = ['H', 'F',
            'Other'];

  submitted = false;

  constructor(
    private userService: UsersService,
    private formBuilder: FormBuilder, 
    private location: Location ,
  ) { }

  async ngOnInit(): Promise<void> {

    this.userService.getUsersFromServer();
    this.users = await this.userService.getUsers();

    let email = firebase.auth().currentUser.email; 
    this.user = this.users.find(el => el != null && el.email===email);

    this.initForm();

  }

  initForm() {
    
    this.signupForm = this.formBuilder.group({
      firstName: [this.user.firstName, [Validators.required]],
      lastName: [this.user.lastName, [Validators.required]],
      position: [this.user.position, [Validators.required]],
      gender: [this.user.gender, ],
      birthdate: [this.user.birthdate, ],
      birthplace: [this.user.birthplace, ],
      department: [this.user.department, ],
      address: [this.user.address, ],
      phone: [this.user.phone, ],
      endDate: [this.user.endDate, ],
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {

    this.submitted = true;

    this.user.firstName = this.signupForm.get('firstName').value;
    this.user.lastName = this.signupForm.get('lastName').value;
    this.user.position = this.signupForm.get('position').value;
    this.user.birthdate = this.signupForm.get('birthdate').value;
    this.user.birthplace = this.signupForm.get('birthplace').value;
    this.user.gender = this.signupForm.get('gender').value;
    this.user.department = this.signupForm.get('department').value;
    this.user.address = this.signupForm.get('address').value;
    this.user.phone = this.signupForm.get('phone').value;
    this.user.endDate = this.signupForm.get('endDate').value;

    this.userService.modifyUser(this.user); // Modifying the user service firebase

  }

}
