import { Component, OnInit } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';

//import "firebase/firestore";

@Component({
  selector: 'app-main-window',
  templateUrl: './main-window.component.html',
  styleUrls: ['./main-window.component.scss']
})
export class MainWindowComponent implements OnInit {
  isAuth:boolean;
  
  public user : User;

  public users : User[] ;

  constructor(private authService: AuthService,
    private userService: UsersService,
    ) { 

  }

  async ngOnInit(): Promise<void> {

    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth = true
        }else{
          this.isAuth = false;
        }
      }
    );

    let email = firebase.auth().currentUser.email; 

    this.userService.getUsersFromServer();
    this.users = await this.userService.getUsers();
    this.user = this.users.find(el => el != null && el.email===email);

  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
