import { Injectable } from '@angular/core'
import { Subject } from "rxjs";
import { Client } from '../models/client';
import firebase from "firebase/app";
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;
//import {AbstractControl,ValidatorFn} from '@angular/forms';


@Injectable()
export class ClientsService {

    list_de_clients: Client[] = [];
    clientsSubject = new Subject<Client[]>();
    edit:boolean=false;
    value: number=-1;
    valueManager=true;

    constructor(){
        this.getClients();
    }
  
    emitClients() {
      this.clientsSubject.next(this.list_de_clients);
    }

    saveClients() {
        firebase.database().ref('/clients').set(this.list_de_clients);
    }

    getClients() {
      if(this.valueManager){

        firebase.database().ref('/clients')
          .on('value', (data: DataSnapshot) => {
              this.list_de_clients = data.val() ? data.val() : [];
              this.emitClients();

            }
          );

        }else{this.emitClients();}
      }
    
      getSingleClient(id: number) {
        return new Promise(
          (resolve, reject) => {
            firebase.database().ref('/clients/' + id).once('value').then(
              (data: DataSnapshot) => {
                resolve(data.val());
              }, (error) => {
                reject(error);
              }
            );
          }
        );
      }

      createOrEdit(b :boolean, i:number){
        this.edit = b;
        this.value = i;
      }

      createNewClient(newClient: Client) {
        if(this.valueManager){

        if(this.edit){
          this.list_de_clients[this.value]=newClient;
        }else{
          this.list_de_clients.push(newClient);
        }
        this.saveClients();
        this.emitClients();
      
      }
      }
    
      removeClient(client: Client) {
        const clientIndexToRemove = this.list_de_clients.findIndex(
          (clientEl) => {
            if(clientEl === client) {
              return true;
            }
          }
        );
        this.list_de_clients.splice(clientIndexToRemove, 1);
        this.saveClients();
        this.emitClients();
      }


     /* NameClientValidator():ValidatorFn{
        return (control: AbstractControl): {[key: string]: boolean} | null => {

          this.list_de_clients.forEach(c=>{
            if(control.value.trim()==c.name){return {'NameNotAllowed':true}};
          });


          return null;
        };
      }*/



}