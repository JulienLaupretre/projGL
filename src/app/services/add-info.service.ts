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

  idProject:number;
  constructor(private httpClient:HttpClient) { 
    this.getListProjectsFromServer();
    this.getListClientsFromServer();
    this.getListUsersFromServer();
  }
  projectSubject = new Subject<Project[]>();
  clientSubject = new Subject<Client[]>();


  public tasks:Task[] = [];
  public tasks1:Task[] = [];
  public tasks2:Task[] = [];
  //collab =new User(1, "haithem", "dahimi", "dahimihaithem@gmail.com", "employee", ["employee"], new Date(), new Date(),"", "", "", "","",new Date() );

  public listProject:Project[]= [];
  public listClients: Client[];


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

}
