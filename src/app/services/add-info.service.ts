import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Task } from '../models/task';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Subject } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/database';
import DataSnapshot = firebase.database.DataSnapshot;
import { Client } from '../models/client';


@Injectable({
  providedIn: 'root'
})
export class AddInfoService {

  idProject : number;

  public tasks : Task[] = [];
  public tasks1 : Task[] = [];
  public tasks2 : Task[] = [];
  public listProject : Project[] = [];
  public listClients : Client[];

  projectSubject = new Subject<Project[]>();
  clientSubject = new Subject<Client[]>();

  constructor(private httpClient:HttpClient) { 
    this.getListProjectsFromServer();
    this.getListClientsFromServer();
    this.getListUsersFromServer();
  }

  saveProjects(){
    firebase.database().ref('/projects').set(this.listProject);
  }

  getListProjectsFromServer(){
    firebase.database().ref('/projects')
          .on('value', (data: DataSnapshot) => {
              this.listProject = data.val() ? data.val() : [];
              this.emitProjectsubject();
            }
          );
  }

  AddProjectToServer(project:Project) {
    this.listProject.push(project);
    this.saveProjects();
    this.emitProjectsubject();
  }

  emitProjectsubject()
  {
    this.projectSubject.next(this.listProject);
  }

  listTasks:Task[];
  tasksSubject = new Subject<Task[]>();

  saveTasks(){
    firebase.database().ref('/listsOfTasks/'+this.idProject).set(this.listTasks);
  }
  
  getListClientsFromServer(){
    firebase.database().ref('/clients')
          .on('value', (data: DataSnapshot) => {
              this.listClients = data.val() ? data.val() : [];
              this.emitClientSubject();
            }
          );
  }

  emitClientSubject()
  {
    this.clientSubject.next(this.listClients);
  }


  usersSubject = new Subject<User[]>();
  users:User[];

  getListUsersFromServer(){
    firebase.database().ref('/users')
          .on('value', (data: DataSnapshot) => {
              this.users = data.val() ? data.val() : [];
              this.emitUserSubject();
            }
          );
  }

  emitUserSubject()
  {
    this.usersSubject.next(this.users);
  }

  // startProject(proj : Project){
  //   //console.log(this.listProject);

  //   let index = this.listProject.findIndex(p => p === proj);
  //   proj.state = "startedddd";
  //   proj.startDate = new Date();
  //   console.log(proj.startDate);
  //   console.log(this.listProject[index]);
  //   this.listProject[index] = proj;

  //   console.log(this.listProject[index]);
    

  //   this.saveProjects();
  //   this.emitProjectsubject()
  // }

  
  // endProject(proj : Project){
  //   proj.state = "finished";
  //   let index = this.listProject.findIndex(p => p === proj);
  //   this.listProject[index] = proj;
  //   this.saveProjects();
  // }

}
