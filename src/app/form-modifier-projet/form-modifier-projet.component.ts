import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project';
import {Task} from '../models/task';
import {ClientsService} from '../services/clients.service';
import { Client } from '../models/client';
import { User } from '../models/user';
import { AddInfoService } from '../services/add-info.service';


import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form-modifier-projet',
  templateUrl: './form-modifier-projet.component.html',
  styleUrls: ['./form-modifier-projet.component.scss']
})
export class FormModifierProjetComponent implements OnInit {

  public listClients: Client[];
  clientSubscription: Subscription;

  public listUsers: User[];
  userSubscription: Subscription;

  constructor(private router: Router,
    public dialogRef:MatDialogRef<FormModifierProjetComponent>,
    @Inject(MAT_DIALOG_DATA) public projetActuel:Project,
    public clService:ClientsService,
    public ProjectsService: AddInfoService) { }

    public projectName:string = "";
  public ChefName:string = "";
  public ClientName:string="";
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = "";

  public taskName:string;
  public startDateTask:Date;
  public endDateTask:Date;
  public collaboRes:string;
  public Cestimee:number;
  public tacheMere:string;
  public dependencylist:string[];
  public descriptionTask:string;
  public task:Task;

  ngOnInit(): void {
    this.userSubscription = this.ProjectsService.usersSubject.subscribe(
      (listUs: User[]) => {
        this.listUsers = listUs;
      }
    );
    this.ProjectsService.emitUserSubject();

    this.clientSubscription = this.clService.clientsSubject.subscribe(
      (listCl: Client[]) => {
        this.listClients = listCl;
      }
    );
    this.clService.emitClients();
    this.initialiserForm();
  }


  initialiserForm()
  {
    this.ClientName = this.projetActuel.client;
    this.StartDate = this.projetActuel.startDate;
    this.EndDate = this.projetActuel.estimatedEndDate;
    this.Description = this.projetActuel.description;
  }


  AddTask(){
    
  }

}
