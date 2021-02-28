import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { AddInfoService } from '../services/add-info.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {FormProjectComponent} from '../form-project/form-project.component'
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
  public projectsChefProjet: Project[];
  public projectsCollabo: Project[];
  constructor(public ProjectsService: AddInfoService ,private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.projectsSubscription = this.ProjectsService.projectSubject.subscribe(
      (listpr: Project[]) => {
        this.projectsChefProjet = listpr;
        this.projectsCollabo= listpr;
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
