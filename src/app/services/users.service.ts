import { Injectable, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import firebase from "firebase/app";
import "firebase/database";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UsersService{
  
  constructor(private httpClient: HttpClient) { }

  public user: User;

  public users: User[];

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
      },
      (error) => {
        console.log('Erreur de sauvegarde' + error)
      }
    )
  }

  createNewUser(newUser: User) {
    this.users.push(newUser);
    this.saveUsers();
    this.emitUsers();
  }

  modifyUser(u: User) {
    let index = this.users.findIndex(user => user.email === u.email);
    this.users[index] = u;
    this.saveUsers();
    this.emitUsers();
  }

  getUsersFromServer() { //This need to be called before using function that use firebase DB
    this.httpClient
    .get<any[]>(this.userURL).subscribe(
      (response) => {
        if (response == null){ // if response is null we create a 1st user to instanciate the list
          let d = new Date();
          let us = new User('email','prenom','nom','cadre', false, false, false, d);
          this.users = [us];
          this.saveUsers();

        }else{
        this.users = response;
        }
        this.emitUsers();
      },
      (error) => {
        console.log('Erreur de chargement ! ' + error);
      }
    )
  }

  getUserBy(mail:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users').orderByChild("email").equalTo(mail).once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }


  searchUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL);
  }

  getUsers(): Promise<User[]> {
    return this.httpClient.get<User[]>(this.userURL).toPromise();
  }

  getUser(email: string): User {
    console.log("getting...")
    this.getUsersFromServer();
    let index = this.users.findIndex(user => user.email === email);
    this.users[index]

    return this.users[index];
  }

  delete(email : string){
    //Suppression de la base de données
    let index = this.users.findIndex(user => user.email === email)
    this.users.splice(index, 1);
    this.saveUsers();
  }


}
