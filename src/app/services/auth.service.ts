import { Injectable } from '@angular/core';
import firebase from "firebase/app";
import "firebase/auth";

@Injectable(
)
export class AuthService{

    constructor() {}

    signInUser(email: string, password: string){
        return new Promise<void>(
            (resolve, reject) => {
                firebase.auth().signInWithEmailAndPassword(email,password).then(
                    () => {
                        resolve();
                    },
                        (error)=>{
                            reject(error);
                        }
                );
            }
        );
    }

    signOutUser(){
        firebase.auth().signOut();
    }
  
  createNewUser(email: string, password: string) {

    // createUserWithEmailAndPassword will signIn the user with the created info
    // so we need to signIn back the admin after the creation
    let originalUser = firebase.auth().currentUser; 

    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            firebase.auth().updateCurrentUser(originalUser); //SignIn back the admins
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  changePassword(psw : string){
    //return firebase.auth().currentUser.updatePassword(psw));
    return new Promise<void>(
      (resolve, reject) => {
        firebase.auth().currentUser.updatePassword(psw).then(
          () => {
            resolve();
            //firebase.auth().updateCurrentUser(originalUser); //SignIn back the admins
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

}

