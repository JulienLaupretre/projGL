import { Component, Input, OnInit } from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { AddInfoService } from '../services/add-info.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-project',
  templateUrl: './form-project.component.html',
  styleUrls: ['./form-project.component.scss']
})
export class FormProjectComponent implements OnInit {

  @Input() currentProject:Project;
  public task:Task;
  TasksSubscription: Subscription;
  constructor(public ProjectsService: AddInfoService, private router: Router, public dialogRef:MatDialogRef<FormProjectComponent>) { }
  
  public projectName:string = "";
  public ChefName:string = "";
  public ClientName:string="";
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = "";

  closeResult = '';
  projectsSubscription: Subscription;
  public projectsChefProjet: Project[];
  public projectsCollabo: Project[];


  
  ngOnInit(): void {
    this.projectsSubscription = this.ProjectsService.projectSubject.subscribe(
      (listpr: Project[]) => {
        this.projectsChefProjet = listpr;
        this.projectsCollabo= listpr;
      }
    );
    this.ProjectsService.emitProjectsubject();
  }

  onViewTask(id: number) {
    this.router.navigate(['/listTask', id]);
  }

  projet:Project;
  AddProject(){
    //this.collab =new User("haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );
    this.projet = new Project(this.projectsChefProjet.length, this.projectName, "dahimihaithem@gmail.com", this.Description, "started", this.StartDate, this.EndDate, new Date(), null, null, [])
    this.ProjectsService.AddProjectToServer(this.projet);
  }

}