import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { Component, Injectable, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from 'ngx-filter-pipe';
import { DashboardService } from '../services/dashboard.service';
import { Task } from '../models/task';
import { Project } from '../models/project';
import { TaskProject } from '../models/taskProject';
import { User } from '../models/user';
import { Subscription } from 'rxjs';
import firebase from "firebase/app";




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})




export class DashboardComponent implements OnInit{
    
 
  
  current_user:string = "dahimihaithem@gmail.com";

  projects : Project [] = [];
  projectsCP :  Project [] = [];
  
  projetsCollab: TaskProject[] = [];

  projetsSubscription: Subscription;

  projetsCollabSubscription: Subscription;

  
  current_task_proj:TaskProject;
  current_task : Task;
  index_current_project:number;
  index_current_task : number;

  closeResult = "";

  avancement_form : number;
  chargeCons_form : number;
  chargeRestante_form : number;
  disabledChargCons : boolean = false;
  disabledAvancement : boolean = false;
  disabledChargeRestante : boolean = false;
  listNgModel_form: Set<string> = new Set<string>();

  taskFilter: any = { name: '' };
  projectFilter: any = {name: ''};
  selectedFilter: any = this.taskFilter;
  private dashboardService : DashboardService;

  constructor( private modalService: NgbModal, private filter: FilterPipe) {  
    this.dashboardService = new DashboardService(this.current_user);
    //this.dashboardService.getProjetTaskUser (this.current_user);
    //this.dashboardService.getProjectsByCollab(this.current_user);
  }
  
  ngOnInit(): void {
    this.reset();
    /*this.projetsSubscription = this.dashboardService.projectSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        console.log(this.projects);   
      }
    );
    this.dashboardService.emitProjects();*/

    this.projetsSubscription = this.dashboardService.projectCPSubject.subscribe(
      (projects: Project[]) => {
        this.projectsCP = projects; 
      }
    );
    this.dashboardService.emitProjectsCP();

    this.projetsCollabSubscription = this.dashboardService.projectCollabSubject.subscribe(
      (projects: TaskProject[]) => {
       this.projetsCollab = projects;  
        console.log("icii"); 
        console.log(this.projetsCollab);
        //this.projetsCollab[0]["task"];
        console.log("icii2");
      }
    );
    this.dashboardService.emitProjectsCollab();
  }

   open2(content:any, taskproject:TaskProject)
   {
    this.current_task_proj = taskproject;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
   }

   open(content : any, i: number, task:Task, iProject:number ) {
    this.current_task = task;
    this.index_current_task = i;
    this.index_current_project = iProject;
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

  onSubmit(form: NgForm) {
    this.current_task_proj.task.usedWorkload = form.value['usedWorkload'];
    this.current_task_proj.task.progress = form.value['progress'];
    this.current_task_proj.task.remainingWorkload = form.value['remainingWorkload'];
    let idTask =  this.current_task_proj.task.id;
    firebase.database().ref('/projects/' + this.current_task_proj.id + '/listTask/' + idTask).set( this.current_task_proj.task);
    console.log('/projects/' + this.current_task_proj.id + '/listTask/' + idTask);
    this.ngOnInit();
    this.modalService.dismissAll(); //dismiss the modal
  }

  onChange(f: NgForm, input:NgModel)
  {
    if(input.value != "")
    {
      this.listNgModel_form.add(input.name);
    }
   
    if(this.listNgModel_form.size == 2)
    {
      if(this.listNgModel_form.has("usedWorkload") && this.listNgModel_form.has("progress") )
      {
        this.chargeRestante_form = ((this.chargeCons_form * 100)/this.avancement_form) - this.chargeCons_form;
        this.disabledChargeRestante = true;
      }
      if(this.listNgModel_form.has("remainingWorkload") && this.listNgModel_form.has("progress") )
      {
        this.chargeCons_form = ((this.chargeRestante_form * 100)/this.avancement_form) - this.chargeRestante_form;
        this.disabledChargCons = true;
      }
      if(this.listNgModel_form.has("remainingWorkload") && this.listNgModel_form.has("usedWorkload") )
      {
        this.avancement_form = 100/((this.chargeCons_form + this.chargeRestante_form)/this.chargeCons_form);
        this.disabledAvancement = true;
        
      } 
    }
  }

  reset()
    {
      this.listNgModel_form.clear();
      this.chargeCons_form = null;
      this.chargeRestante_form = null;
      this.avancement_form = null;
      this.disabledChargCons = false;
      this.disabledAvancement = false;
      this.disabledChargeRestante = false;
    }
    
  
    
  private getClassProgressBar(index: number){
    /*if(index == 1){
      this.tasks[index].barrevalue = "progress-bar progress-bar-striped danger";
    }
    if(index == 2){
      this.tasks[index].barrevalue = "progress-bar progress-bar-striped progress-bar-warning";
    }
    if(index == 3){
      this.tasks[index].barrevalue = "progress-bar progress-bar-striped progress-bar-success";
    }*/
  }

  ngOnDestroy() {
    this.projetsSubscription.unsubscribe();
  }

}
