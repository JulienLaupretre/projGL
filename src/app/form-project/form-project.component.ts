import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { AddInfoService } from '../services/add-info.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import firebase from 'firebase/app';
import 'firebase/database';
import { User } from '../models/user';
import { Client } from '../models/client';
import {ClientsService} from '../services/clients.service';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})
export class FormProjectComponent implements OnInit {

  @Input() currentProject:Project;
  TasksSubscription: Subscription;

  public listClients: Client[];
  clientSubscription: Subscription;



  public projetActuel:Project;
  public listTask:Task[] = [];
  constructor(public ProjectsService: AddInfoService, 
              public dialogRef:MatDialogRef<FormProjectComponent>,
              public clService:ClientsService) { }
  
  public projectName:string = null;
  public ClientName:string= null;
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = null;

  closeResult = '';
  projectsSubscription: Subscription;
  public projectsChefProjet: Project[];
  public projectsCollabo: Project[];

  public taskName:string;
  public start_dateTask:Date;
  public end_dateTask:Date;
  public collaboRes:string;
  public Cestimee:number;
  public tacheMere:string;
  public dependencylist:string[];
  public description:string;
  public task:Task;
  
  public listUsers: User[];
  userSubscription: Subscription;

  ngOnInit(): void {
    this.projectsSubscription = this.ProjectsService.projectSubject.subscribe(
      (listpr: Project[]) => {
        this.projectsChefProjet = listpr;
        this.projectsCollabo= listpr;
      }
    );
    this.ProjectsService.emitProjectsubject();

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
  }



  projet:Project;
  AddProject(){
    //this.collab =new User("haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );
    if(this.StartDate === undefined && this.EndDate === undefined)
    {
      this.projet = new Project(this.projectsChefProjet.length, this.projectName, firebase.auth().currentUser.email, this.Description, "not started", null, null, new Date(), this.ClientName, null, this.listTask)
    }
    else{
      this.projet = new Project(this.projectsChefProjet.length, this.projectName, firebase.auth().currentUser.email, this.Description, "not started", this.StartDate, this.EndDate, new Date(), this.ClientName, null, this.listTask)
    }
    this.ProjectsService.AddProjectToServer(this.projet);
  }

  splitted:string[];
  getEmailFromName(name:String){
    if(name !=undefined || name != null){
    this.splitted = name.split(" ");
    for(var index=0; index<this.listUsers.length; ++index){
      if(this.splitted[0]== this.listUsers[index].firstName 
        && this.splitted[1]== this.listUsers[index].lastName){
          return this.listUsers[index].email;
        }
    }
  }
  }

  hasTaskFille(task:Task){
    return task.hasOwnProperty('listTaskChild');
  }

  AddTask(){
    if(this.end_dateTask === undefined && this.start_dateTask === undefined){
      this.end_dateTask = null;
      this.start_dateTask =null;
    }
    if(this.collaboRes ===undefined){
      this.collaboRes = null;
    }
    if(this.description ===undefined){
      this.description = null;
    }
    if(this.Cestimee == undefined){
      this.Cestimee = null;
    }
    if(this.dependencylist == undefined){
      this.dependencylist = null;
    }
    if(this.tacheMere === "none" || this.tacheMere === undefined || this.tacheMere === null){
      this.task=new Task(this.listTask.length,this.taskName,"not started", this.collaboRes, this.start_dateTask, this.start_dateTask, this.end_dateTask, this.end_dateTask, this.description, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);
      this.listTask.push(this.task);
    } else {
      for( var index = 0; index < this.listTask.length; ++index){
        if(this.listTask[index].name == this.tacheMere){
          this.listTask[index].collab = null;
          this.task=new Task(this.listTask[index].listTaskChild.length,this.taskName,"not started",  this.collaboRes, this.start_dateTask, this.start_dateTask, this.end_dateTask, this.end_dateTask, this.description, this.Cestimee,0,this.Cestimee,0,[],[],[], this.listTask[index].niveau +1);

          this.listTask[index].listTaskChild.push(this.task);
          if(!this.listTask[index].startDate === undefined && !this.listTask[index].endDate === undefined)
          {
            if(this.listTask[index].listTaskChild.length === 1){
              this.listTask[index].startDate = this.task.startDate;
              this.listTask[index].endDate = this.task.endDate;
              this.listTask[index].estimatedWorkload = this.task.estimatedWorkload;
            } else {
              this.listTask[index].estimatedWorkload += this.task.estimatedWorkload;
              if(this.listTask[index].startDate > this.task.startDate){
                this.listTask[index].startDate = this.task.startDate;
              }
              if(this.listTask[index].endDate < this.task.endDate){
                this.listTask[index].endDate = this.task.endDate;
              }
            }
          }
          
        }
        
        else if(this.listTask[index].hasOwnProperty('listTaskChild')){
          this.listTask[index].estimatedWorkload =null;
            for(var index2 = 0; index2 < this.listTask[index].listTaskChild.length; ++index2)
              {
                this.task=new Task(this.listTask[index].listTaskChild[index2].listTaskChild.length,this.taskName, "not started",  this.collaboRes, this.start_dateTask, this.start_dateTask, this.end_dateTask, this.end_dateTask, this.description, this.Cestimee,0,this.Cestimee,0,this.dependencylist,[],[], this.listTask[index].niveau +1);
                
                if(this.listTask[index].listTaskChild[index2].name == this.tacheMere){
                  this.listTask[index].listTaskChild[index2].listTaskChild.push(this.task);
                  this.listTask[index].listTaskChild[index2].collab = null;
                  if(!this.listTask[index].listTaskChild[index2].startDate === undefined && !this.listTask[index].listTaskChild[index2].endDate === undefined )
                  {
                    if(this.listTask[index].listTaskChild[index2].listTaskChild.length === 1){
                      this.listTask[index].listTaskChild[index2].startDate = this.task.startDate;
                      this.listTask[index].listTaskChild[index2].endDate = this.task.endDate;
                      this.listTask[index].listTaskChild[index2].estimatedWorkload = this.task.estimatedWorkload;
                    } else {
                      this.listTask[index].listTaskChild[index2].estimatedWorkload += this.task.estimatedWorkload;
                      if(this.listTask[index].listTaskChild[index2].startDate > this.task.startDate){
                        this.listTask[index].listTaskChild[index2].startDate = this.task.startDate;
                      }
                      if(this.listTask[index].listTaskChild[index2].endDate < this.task.endDate){
                        this.listTask[index].listTaskChild[index2].endDate = this.task.endDate;
                      }
                    }
                  }
                }
              }
            
          }
        }
    }

    this.taskName = null;
    this.start_dateTask = null;
    this.end_dateTask = null;
    this.collaboRes = null;
    this.Cestimee = null;
    this.tacheMere = "none";
    this.dependencylist = [];
    this.description = null;
    this.task = null;
  }

  projectValid(){
    return (this.projectName ===null || this.projectName === undefined || this.projectName === "");
  }

  taskValid(){
    return (this.taskName ===null || this.taskName === undefined || this.taskName === "")
  }
  
  taskFormOpened = false;
  openTaskForm(){
    this.taskFormOpened=true;
  } 

}