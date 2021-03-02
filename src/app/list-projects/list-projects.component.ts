import { Component, Inject, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';
import {AddInfoService} from '../services/add-info.service'
import { Router } from '@angular/router';
import { Task } from '../models/task';
import firebase from 'firebase/app';
import { User } from '../models/user';
import 'firebase/database';
import { Client } from '../models/client';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ListTasksComponent } from '../list-tasks/list-tasks.component';


@Component({
  selector: 'app-list-projects',
  templateUrl: './list-projects.component.html',
  styleUrls: ['./list-projects.component.scss']
})

export class ListProjectsComponent implements OnInit {
  
  closeResult = '';
  public projetActuel:Project;
  
  @Input() public listProjects:Project[];

  public projectName:string = "";
  public ChefName:string = "";
  public ClientName:string="";
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = "";

  public taskName:string;
  public startDate:Date;
  public endDate:Date;
  public collaboRes:string;
  public Cestimee:number;
  public tacheMere:string;
  public dependencylist:string[];
  public description:string;
  public task:Task;

  constructor(
    public service:AddInfoService,
    private router: Router,
    private dialog: MatDialog,

     ) { }

  public listClients: Client[];
  clientSubscription: Subscription;

  public listUsers: User[];
  userSubscription: Subscription;

  ngOnInit(): void {
    this.clientSubscription = this.service.clientSubject.subscribe(
      (listCl: Client[]) => {
        this.listClients = listCl;
      }
    );
    this.service.emitClientSubject();

    this.userSubscription = this.service.usersSubject.subscribe(
      (listUs: User[]) => {
        this.listUsers = listUs;
      }
    );
    this.service.emitUserSubject();
  }

  maxDate(date1:Date, date2:Date){
    if(date1>date2)
    {
      return date1;
    }
    else return date2;
  }

  minDate(date1:Date, date2:Date){
    if(date1<date2)
    {
      return date1;
    }
    else return date2;
  }

  open(projet){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    dialogConfig.data = projet;
    this.dialog.open(ListTasksComponent, dialogConfig);
  }

  openAndGetProject(projet,content){
    /*this.projetActuel = projet;
    this.projectName = this.projetActuel.name.toLowerCase();
    if(this.projetActuel.hasOwnProperty('estimatedEndDate'))
    {
      this.StartDate = this.projetActuel.startDate;
    } 
    if(this.projetActuel.hasOwnProperty('estimatedEndDate'))
    {
      this.EndDate = this.projetActuel.estimatedEndDate;
    } 
    if(this.projetActuel.hasOwnProperty('client'))
    {
      this.ClientName= this.projetActuel.client.toLowerCase();
    }  
    if(this.projetActuel.hasOwnProperty('description'))
    {
      this.Description= this.projetActuel.description;
    } 
    if(this.projetActuel.hasOwnProperty('projectManager'))
    {
      this.ChefName = this.projetActuel.projectManager;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`; 
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });*/
  }

/*
  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }*/

  onViewProject(id: number) {
    this.router.navigate(['/projects', id.toString()]);
  }

  saveChanges(){
    this.projetActuel.name = this.projectName.toLowerCase();
    this.projetActuel.startDate = this.StartDate;
    this.projetActuel.estimatedEndDate = this.EndDate;
    this.projetActuel.client = this.ClientName.toLowerCase();
    this.projetActuel.description = this.Description;
    this.projetActuel.projectManager = this.ChefName.toLowerCase();
    this.service.saveProjects();
  }

  AddTask(){
    this.task=new Task(1,this.taskName, "non demarree", this.collaboRes, this.startDate, this.startDate, this.endDate, this.endDate, this.description, this.Cestimee,2,2,2,[],[],[]);

    if(!this.projetActuel.hasOwnProperty('listTask'))
    {
      var db = firebase.database()
        var ref = db.ref();
        var usersRef = ref.child("projects");
        // alanisawesome is the key of the object
        var hopperRef = usersRef.child(this.projetActuel.id.toString());
        hopperRef.update({
          "listTask": [this.task]
        });
    } else {
      this.projetActuel.listTask.push(this.task);
    }
  }

  hasClient(project:Project){
    return project.hasOwnProperty('client');
  }

  hasStartDate(project:Project){
    return project.hasOwnProperty('startDate');
  }
  hasEndDate(project:Project){
    return project.hasOwnProperty('estimatedEndDate');
  }

}
