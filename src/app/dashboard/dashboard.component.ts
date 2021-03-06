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
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  
})




export class DashboardComponent implements OnInit{
    
 
  current_user2:any;;
  current_user:string = firebase.auth().currentUser.email; //"Marie";//"jean.doucet@pops.fr";//"Teo";//"Ines";;
  user:User;
  users:User[];
  
  current_date:Date =  new Date("2021-03-09");

  projects : Project [] = [];
  projectsCP :  TaskProject [] = [];
  
  projetsCollab: TaskProject[] = [];

  projetsSubscription: Subscription;

  projetsCollabSubscription: Subscription;
  userSubscription : Subscription;

  
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

  taskFilter: any = {nameTaskForFilter: '' };
  projectFilter: any = {name: ''};
  selectedFilter: any = this.projectFilter;

  taskFilter2: any = {nameTaskForFilter: '' };
  projectFilter2: any = {name: ''};
  selectedFilter2: any = this.projectFilter2;


  private dashboardService : DashboardService;
  private usersService : UsersService;
  
  constructor( private modalService: NgbModal, private filter: FilterPipe, private userService:UsersService ) {  
    this.dashboardService = new DashboardService(this.current_user);
    //this.usersService = new UsersService();
    //this.current_user2 = this.usersService.getUserBy(this.current_user);
  }
  
  async ngOnInit() {
    this.reset();
    /*this.projetsSubscription = this.dashboardService.projectSubject.subscribe(
      (projects: Project[]) => {
        this.projects = projects;
        console.log(this.projects);   
      }
    );
    this.dashboardService.emitProjects();*/
    let email = firebase.auth().currentUser.email; 

    this.userService.getUsersFromServer();
    this.users = await this.userService.getUsers();
    this.user = this.users.find(el => el != null && el.email===email);


    this.projetsSubscription = this.dashboardService.projectCPSubject.subscribe(
      (projects: TaskProject[]) => {
        this.projectsCP = projects; 
      }
    );
    this.dashboardService.emitProjectsCP();

    this.projetsCollabSubscription = this.dashboardService.projectCollabSubject.subscribe(
      (projects: TaskProject[]) => {
       this.projetsCollab = projects;  
        //console.log("icii"); 
        //console.log(this.projetsCollab);
        //console.log("icii2");
      }
    );
    this.dashboardService.emitProjectsCollab();
  }

   open2(content:any, taskproject:TaskProject)
   {
    this.reset();
    this.current_task_proj = taskproject;
    console.log("okkkkk");
    console.log(this.current_task_proj.task.actualEndDate);
    var d = new Date();
    //date.setDate(1);
    var date = this.current_task_proj.task.actualEndDate;
    //date.setDate(d.getDate());
    //date.setMonth(d.getMonth());
    //date.setFullYear(d.getFullYear());
    this.current_task_proj.task.actualEndDate = date;
    //this.current_task_proj.task.actualEndDate.setMonth(date.getMonth());
    //this.current_task_proj.task.actualEndDate.setFullYear(date.getFullYear());
    //this.current_task_proj.task.actualEndDate = date;
    console.log(this.current_task_proj.task.actualEndDate);
    //console.log(new Date().toISOString().substring(0, 10));
    if(this.current_task_proj.task.state == "finished")
    {
      this.chargeRestante_form = this.current_task_proj.task.remainingWorkload;
      this.chargeCons_form =  this.current_task_proj.task.usedWorkload;
      this.avancement_form =  this.current_task_proj.task.progress;

      this.disabledChargeRestante = true;
      this.disabledChargCons = true;
      this.disabledAvancement = true;

    }
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
    if(this.current_task_proj.task.progress == 100)
    {
      this.current_task_proj.task.state = "finished";
      //this.current_task_proj.task.actualEndDate = new Date();
    }
    //let idTask =  this.current_task_proj.task.id;
    firebase.database().ref(this.current_task_proj.path).set( this.current_task_proj.task);
    //console.log(this.current_task_proj.path);
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

  ngOnDestroy() {
    this.projetsSubscription.unsubscribe();
  }
}
