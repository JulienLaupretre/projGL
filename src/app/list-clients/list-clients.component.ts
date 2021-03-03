import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { Client } from '../models/client';
import { FormClientComponent} from '../form-client/form-client.component'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog , MatDialogConfig} from '@angular/material/dialog';
import {ClientComponent} from '../client/client.component';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss']
})
export class ListClientsComponent implements OnInit, OnDestroy {

  clients: Client[];
  clientFilter: any = {name:''};
  clientsSubscription: Subscription;

  constructor(private clientsService: ClientsService, private router: Router, private dialog:MatDialog) {
    
   }

  ngOnInit(): void {
    this.clientsSubscription = this.clientsService.clientsSubject.subscribe(
      (clients: Client[]) => {
        this.clients = clients;
      }
    );
    this.clientsService.emitClients();
  }


  onNewClient() {
    this.clientsService.createOrEdit(false,-1);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=null;
    this.dialog.open(FormClientComponent,dialogConfig);
  }

  onDeleteClient(client: Client) {
    if(confirm('Voulez-vous vraiment supprimer cet élément ?'))
    {
    this.clientsService.removeClient(client);
    }
  }

  onEditClient(client: Client, index: number) {
    this.clientsService.createOrEdit(true,index);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.width="60%";
    dialogConfig.data=client;
    this.dialog.open(FormClientComponent,dialogConfig);
  
  }

  onViewClient(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width="60%";
    dialogConfig.data=id;
    this.dialog.open(ClientComponent,dialogConfig);
  
  }
  
  ngOnDestroy() {
    
      this.clientsSubscription.unsubscribe();
    
    
  }

  isEmpty(s: string):string{
    if(s){
      return s;
    }else{
      return "---";
    }
  }

}

 

 

