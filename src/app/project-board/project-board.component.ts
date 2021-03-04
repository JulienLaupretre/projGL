import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { AddInfoService } from '../services/add-info.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {FormProjectComponent} from '../form-project/form-project.component'
import { UsersService } from '../services/users.service';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-project-board',
  templateUrl: './project-board.component.html',
  styleUrls: ['./project-board.component.scss']
})

export class ProjectBoardComponent implements OnInit {

  public projectName:string = "";
  public ChefName:string = "";
  //public ClientName:string="";
  public StartDate:Date;
  public EndDate:Date;
  public Description:string = "";

  closeResult = '';
  projectsSubscription: Subscription;
  public projectsChefProjet: Project[] = [];
  public projectsCollabo: Project[];

  users : User[];
  user : User;

  constructor(public ProjectsService: AddInfoService, 
    private router: Router, 
    private dialog: MatDialog,
    private userService: UsersService,
    ) { }

    async ngOnInit(): Promise<void> {

      let email = firebase.auth().currentUser.email; 

      this.userService.getUsersFromServer();
      this.users = await this.userService.getUsers();
      this.user = this.users.find(el => el != null && el.email===email);
  
      this.projectsSubscription = this.ProjectsService.projectSubject.subscribe(
        (listpr: Project[]) => {
  
          const haveChild = (t) => t.listTaskChild != null;
  
          const isCollab = (t) => t.collab === email;
          const isCollab2 = (t) => t.listTaskChild != null && t.listTaskChild.some(isCollab);
          const isCollab3 = (t) => t.listTaskChild != null && t.listTaskChild.some(isCollab2);
  
          this.projectsChefProjet = listpr.filter(proj => proj.projectManager === email);
         
          this.projectsCollabo= listpr.filter(proj => proj.state == "started" && proj.hasOwnProperty("listTask")).filter(proj => 
            proj.listTask.filter(task => task.collab != null).some(isCollab) || //Case tache fille lvl 0
            proj.listTask.filter(task => task.hasOwnProperty('listTaskChild')).some(isCollab2) || //Case tache fille lvl 1
            proj.listTask.filter(task => task.listTaskChild != null && task.listTaskChild.some(haveChild)) 
              .some(isCollab3) ); //Case tache fille lvl 2 
        }
      );
      this.ProjectsService.emitProjectsubject();
      }

  open(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";
    this.dialog.open(FormProjectComponent, dialogConfig);
  }
/*
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  projet:Project;
  collab:User;
  AddProject(){
    this.collab =new User("haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );
    this.projet = new Project(this.projectsChefProjet.length, this.projectName, "dahimihaithem@gmail.com", this.Description, "started", this.StartDate, this.EndDate, new Date(), null, null, [])
    this.ProjectsService.AddProjectToServer(this.projet);
  }
*/
}
