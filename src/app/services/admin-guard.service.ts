import { Injectable, OnInit } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { Observable } from "rxjs";
import firebase from "firebase/app";
import "firebase/auth";
import { UsersService } from './users.service';
import { User } from '../models/user';
//import "firebase/firestore";

/*@Injectable()
export class AdminGuardService implements CanActivate{
    user:User;
    users:User[];
    constructor(private router: Router,private userService: UsersService) {}
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return new Promise(
            (resolve, reject) => {
                let email = afirebase.auth().currentUser.email; 
                this.userService.getUsersFromServer();
                this.userService.getUsers().find(el => el != null && el.email===email);
                this.user = this.users.find(el => el != null && el.email===email);
            }
        );
    }
}*/

