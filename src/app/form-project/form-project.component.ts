import { Component, Input, OnInit } from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { AddInfoService } from '../services/add-info.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import firebase from 'firebase/app';
import 'firebase/database';
import { User } from '../models/user';


@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})
export class FormProjectComponent implements OnInit {

  @Input() currentProject:Project;
  TasksSubscription: Subscription;
  public projetActuel:Project;
  public listTask:Task[] = [];
  constructor(public ProjectsService: AddInfoService, private router: Router, public dialogRef:MatDialogRef<FormProjectComponent>) { }
  
  public projectName:string = "";
  public ClientName:string="";
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = "";

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
  }

  onViewTask(id: number) {
    this.router.navigate(['/listTask', id]);
  }
  

  projet:Project;
  AddProject(){
    //this.collab =new User("haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );
    this.projet = new Project(this.projectsChefProjet.length, this.projectName, "dahimihaithem@gmail.com", this.Description, "started", this.StartDate, this.EndDate, new Date(), null, null, this.listTask)
    this.ProjectsService.AddProjectToServer(this.projet);

  }

  AddTask(){
    if(this.tacheMere === undefined || this.tacheMere === null){
      this.task=new Task(1,this.taskName, this.collaboRes, this.start_dateTask, this.start_dateTask, this.end_dateTask, this.end_dateTask, this.description, this.Cestimee,2,2,2,[],[],[], 0);
      this.listTask.push(this.task);
    } else {
      for( var index = 0; index < this.listTask.length; ++index){
        if(this.listTask[index].name == this.tacheMere){
          this.task=new Task(1,this.taskName, this.collaboRes, this.start_dateTask, this.start_dateTask, this.end_dateTask, this.end_dateTask, this.description, this.Cestimee,2,2,2,[],[],[], this.listTask[index].niveau +1);
          this.listTask[index].listTaskChild.push(this.task);
          if(this.listTask[index].listTaskChild.length === 1){
            this.listTask[index].startDate = this.task.startDate;
            this.listTask[index].endDate = this.task.endDate;
          } else {
            if(this.listTask[index].startDate > this.task.startDate){
              this.listTask[index].startDate = this.task.startDate;
            }
            if(this.listTask[index].endDate < this.task.endDate){
              this.listTask[index].endDate = this.task.endDate;
            }
          }
        }
      }
    }
    /*if(!this.projetActuel.hasOwnProperty('listTask'))
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
    }*/
    this.taskName = "";
    this.start_dateTask = null;
    this.end_dateTask = null;
    this.collaboRes = "";
    this.Cestimee = 0;
    this.tacheMere = null;
    this.dependencylist = [];
    this.description = "";
    this.task = null;
  }

}