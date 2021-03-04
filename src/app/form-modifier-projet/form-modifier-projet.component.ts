import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project';
import {Task} from '../models/task';
import {ClientsService} from '../services/clients.service';
import { Client } from '../models/client';
import { User } from '../models/user';
import { AddInfoService } from '../services/add-info.service';
import 'firebase/database';
import firebase from 'firebase/app';


import { Subscription } from 'rxjs';


@Component({
  selector: 'app-form-modifier-projet',
  templateUrl: './form-modifier-projet.component.html',
  styleUrls: ['./form-modifier-projet.component.scss']
})
export class FormModifierProjetComponent implements OnInit {

  public listTasksProject: Project[];
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
    this.projectName = this.projetActuel.name;
    this.ClientName = this.projetActuel.client;
    this.StartDate = this.projetActuel.startDate;
    this.EndDate = this.projetActuel.estimatedEndDate;
    this.Description = this.projetActuel.description;
  }

  modifyProject(){
    //this.collab =new User("haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );
    this.projetActuel.name =this.projectName;
    if(this.StartDate === undefined)
    {
      this.projetActuel.startDate = null;
    }else{
      this.projetActuel.startDate = this.StartDate;
    }
    
    if(this.EndDate === undefined){
      this.projetActuel.estimatedEndDate = null;
    }
    else{
      this.projetActuel.estimatedEndDate = this.EndDate;
    }

    if(this.Description ===undefined){
      this.projetActuel.description= null;
    }else{
      this.projetActuel.description= this.Description;
    }

    if(this.ClientName == undefined){
      this.projetActuel.client = null;
    } else {
      this.projetActuel.client = this.ClientName;
    }
    this.ProjectsService.saveProjects();
    this.ProjectsService.emitProjectsubject();
  }

  projectValid(){
    return (this.projectName ===null || this.projectName === undefined || this.projectName === "");
  }

  addTaskToProject(){
    if(!this.projetActuel.hasOwnProperty('listTask'))
    {
      this.task=new Task(0,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);

      var db = firebase.database()
        var ref = db.ref();
        var usersRef = ref.child("/projects");
        // alanisawesome is the key of the object
        var hopperRef = usersRef.child(this.projetActuel.id.toString());
        hopperRef.update({
          "listTask": [this.task]
        });
    } else {
      this.task =new Task(this.projetActuel.listTask.length,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);
      this.projetActuel.listTask.push(this.task);
    }
  }


  biggestId:number;
  addTaskToTask1(index: number){
    if(!this.projetActuel.listTask[index].hasOwnProperty('listTask'))
    {
      this.task=new Task(0,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);

      var db = firebase.database()
        var ref = db.ref();
        var projectsRef = ref.child("/projects");
        var projectRef= projectsRef.child(this.projetActuel.id.toString() );
        var taskref = projectRef.child(this.projetActuel.listTask[index].id.toString());
        taskref.update({
          "listTask": [this.task]
        });

    } else {
      this.biggestId = this.projetActuel.listTask[index].listTaskChild[this.projetActuel.listTask[index].listTaskChild.length].id;
      this.task =new Task(this.biggestId+1,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);
      this.projetActuel.listTask[index].listTaskChild.push(this.task);
    }
  }


  addTaskToTask2(index: number, index2:number){
    if(!this.projetActuel.listTask[index].hasOwnProperty('listTaskChild'))
    {
      this.task=new Task(0,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);

      var db = firebase.database()
        var ref = db.ref();
        var projectsRef = ref.child("/projects");
        var taskRef= projectsRef.child(this.projetActuel.listTask[index].listTaskChild[index2].toString());
        var hopperRef = taskRef.child(this.projetActuel.id.toString());
        hopperRef.update({
          "listTask": [this.task]
        });
    } else {
      this.biggestId = this.projetActuel.listTask[index].listTaskChild[this.projetActuel.listTask[index].listTaskChild.length].id;
      this.task=new Task(this.projetActuel.listTask[index].listTaskChild[index2].listTaskChild.length,this.taskName, "not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0,this.dependencylist,[],[], this.projetActuel.listTask[index].niveau +1);
      this.task =new Task(this.biggestId+1,this.taskName,"not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0, this.dependencylist,[],[], 0);
      this.projetActuel.listTask[index].listTaskChild.push(this.task);
    }
  }

  AddTask(){
    if(this.startDateTask === undefined){
      this.startDateTask = null;
    }
    if(this.collaboRes ===undefined){
      this.collaboRes = null;
    }
    if(this.endDateTask ===undefined){
      this.endDateTask = null;
    }
    if(this.Cestimee == undefined){
      this.Cestimee = null;
    }
    if(this.descriptionTask==undefined){
      this.descriptionTask = null;
    }
    if(this.dependencylist == undefined){
      this.dependencylist = null;
    }
    if(this.tacheMere === "none" || this.tacheMere === undefined || this.tacheMere === null){
      this.addTaskToProject();
    } else {
      for( var index = 0; index < this.projetActuel.listTask.length; ++index){
        if(this.projetActuel.listTask[index].name == this.tacheMere){
          this.projetActuel.listTask[index].collab = null;
          this.addTaskToTask1(index);
          if(!this.projetActuel.listTask[index].startDate === undefined && !this.projetActuel.listTask[index].endDate === undefined)
          {
            if(this.projetActuel.listTask[index].listTaskChild.length === 1){
              this.projetActuel.listTask[index].startDate = this.task.startDate;
              this.projetActuel.listTask[index].endDate = this.task.endDate;
              this.projetActuel.listTask[index].estimatedWorkload = this.task.estimatedWorkload;
            } else {
              this.projetActuel.listTask[index].estimatedWorkload += this.task.estimatedWorkload;
              if(this.projetActuel.listTask[index].startDate > this.task.startDate){
                this.projetActuel.listTask[index].startDate = this.task.startDate;
              }
              if(this.projetActuel.listTask[index].endDate < this.task.endDate){
                this.projetActuel.listTask[index].endDate = this.task.endDate;
              }
            }
          }
          
        }
        
        else if(this.projetActuel.listTask[index].hasOwnProperty('listTaskChild')){
            for(var index2 = 0; index2 < this.projetActuel.listTask[index].listTaskChild.length; ++index2)
              {
                this.task=new Task(this.projetActuel.listTask[index].listTaskChild[index2].listTaskChild.length,this.taskName, "not started", this.collaboRes, this.startDateTask, this.startDateTask, this.endDateTask, this.endDateTask, this.descriptionTask, this.Cestimee,0,this.Cestimee,0,this.dependencylist,[],[], this.projetActuel.listTask[index].niveau +1);
                
                if(this.projetActuel.listTask[index].listTaskChild[index2].name == this.tacheMere){
                  this.projetActuel.listTask[index].listTaskChild[index2].listTaskChild.push(this.task);
                  this.projetActuel.listTask[index].listTaskChild[index2].collab = null;
                  if(!this.projetActuel.listTask[index].listTaskChild[index2].startDate === undefined && !this.projetActuel.listTask[index].listTaskChild[index2].endDate === undefined )
                  {
                    if(this.projetActuel.listTask[index].listTaskChild[index2].listTaskChild.length === 1){
                      this.projetActuel.listTask[index].listTaskChild[index2].startDate = this.task.startDate;
                      this.projetActuel.listTask[index].listTaskChild[index2].endDate = this.task.endDate;
                      this.projetActuel.listTask[index].listTaskChild[index2].estimatedWorkload = this.task.estimatedWorkload;
                    } else {
                      this.projetActuel.listTask[index].listTaskChild[index2].estimatedWorkload += this.task.estimatedWorkload;
                      if(this.projetActuel.listTask[index].listTaskChild[index2].startDate > this.task.startDate){
                        this.projetActuel.listTask[index].listTaskChild[index2].startDate = this.task.startDate;
                      }
                      if(this.projetActuel.listTask[index].listTaskChild[index2].endDate < this.task.endDate){
                        this.projetActuel.listTask[index].listTaskChild[index2].endDate = this.task.endDate;
                      }
                    }
                  }
                }
              }
            
          }
        }
    }

    this.ProjectsService.saveProjects();
    this.ProjectsService.emitProjectsubject();
    
    this.taskName = null;
    this.startDateTask = null;
    this.endDateTask = null;
    this.collaboRes = null;
    this.Cestimee = null;
    this.tacheMere = "none";
    this.dependencylist = [];
    this.descriptionTask = null;
    this.task = null;

  }

}
