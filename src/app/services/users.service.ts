import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import {Subject} from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService{

  constructor(private httpClient: HttpClient) { }
  
  users: User[];
  usersSubject = new Subject<User[]>();

  private userURL = 'https://projgl-c484f-default-rtdb.europe-west1.firebasedatabase.app/users.json';


  emitUsers() {
    this.usersSubject.next(this.users);
  }

  saveUsers() { 
    // https://www.youtube.com/watch?v=uYhAfgEwNWA&feature=youtu.be
    //2h58 tuto fonction ajout, 3h40 important
  
  this.httpClient.put(this.userURL, this.users)
    .subscribe(
      () => {
        console.log('Enregistrement terminé')
      },
      (error) => {
        console.log('Erreur de sauvegarde' + error)
      }
    )
  }

  createNewUser(newUser: User) {
    console.log(this.users);
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  modifyUser(u: User) {
    let index = this.users.findIndex(user => user.email === u.email)
    this.users[index] = u;
    console.log("user :")
    console.log(this.users[index]);
    this.saveUsers();
    this.emitUsers();
  }

  getUsersFromServer() { //This need to be called before using function that use firebase DB
    this.httpClient
    .get<any[]>(this.userURL).subscribe(
      (response) => {
        if (response == null){ // if response is null we create a 1st user to instanciate the list
          let s = 'Collaborateur';
          let str = [s];
          str.push(s) ;
          let d = new Date();
          let us = new User('email','prenom','nom','cadre',str, d);
          this.users = [us];
          this.saveUsers();

        }else{
        this.users = response;
        }
        this.emitUsers();
        console.log('Chargement terminé ! ');
      },
      (error) => {
        console.log('Erreur de chargement ! ' + error);
      }
    )
  }

  searchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL);
  }

  searchUser(): Promise<User[]> {
        return this.httpClient.get<User[]>(this.userURL).toPromise();
  }

}
