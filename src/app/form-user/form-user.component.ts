import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import "firebase/auth";
import { User } from '../models/user';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  genders = ['H', 'F',
            'Other'];

  listStatus = ['Collaborateur', 'Chef de projet', 'Administrateur'];
  selectedStatus : string;

  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private usersService : UsersService,
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.usersService.getUsersFromServer(); //Fetch user to modify later the list
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      statusName: ['Collaborateur', [Validators.required]],
      gender: ['H', ],
      birthdate: ['', ],
      birthplace: ['', ],
      department: ['', ],
      address: ['', ],
      phone: ['', ],
      endDate: ['', ],
    });
  }
  
  onSubmit() {

    this.submitted = true;

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const firstName = this.signupForm.get('firstName').value;
    const lastName = this.signupForm.get('lastName').value;
    const position = this.signupForm.get('position').value;
    const status = this.signupForm.get('statusName').value;
    const birthdate = this.signupForm.get('birthdate').value;
    const birthplace = this.signupForm.get('birthplace').value;
    const gender = this.signupForm.get('gender').value;
    const department = this.signupForm.get('department').value;
    const address = this.signupForm.get('address').value;
    const phone = this.signupForm.get('phone').value;
    const endDate = this.signupForm.get('endDate').value;
    const startDate = new Date()
    
    const newUser = new User(email, firstName, lastName, position, status, startDate);

    if (birthdate != '' ){newUser.birthdate = birthdate}
    if (birthplace != '' ){newUser.birthplace = birthplace}
    if (gender != '' ){newUser.gender = gender}
    if (department != '' ){newUser.department = department}
    if (address != '' ){newUser.address = address}
    if (phone != '' ){newUser.phone = phone}
    if (endDate != '' ){newUser.endDate = endDate}

    // Adding user to the auth service firebase
    this.authService.createNewUser(email, password).then(
      () => {
        this.usersService.createNewUser(newUser); // Adding user to the user service firebase
      },
      (error) => {
        this.errorMessage = error;
        this.submitted = false;
      }
    );
  }
}