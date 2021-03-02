import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { TaskProject } from '../models/taskProject';
import { User } from '../models/user';
import firebase from "firebase/app";
import "firebase/database";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable()
export class DashboardService{

  projects: Project[] = [];
  projectsCP:Project[] = [];
  projectsCollab: TaskProject[] = [];
  tasks : Task[] = [];
  avancements:any;
  projectSubject = new Subject<Project[]>();
  projectCPSubject = new Subject<Project[]>();
  projectCollabSubject = new Subject<TaskProject[]>();

  emitProjects() {
    this.projectSubject.next(this.projects);
  }

  emitProjectsCP() {
    this.projectCPSubject.next(this.projectsCP);
  }

  emitProjectsCollab() {
    this.projectCollabSubject.next(this.projectsCollab);
  }

  saveAvancement(){
    firebase.database().ref('/avancements').set(this.avancements);
  }
  
  getProjects()
  {
    firebase.database().ref('/projects')
      .on('value', (data: DataSnapshot) => {
          this.projects = data.val() ? data.val() : [];
          this.emitProjects();
        }
      );
  }

  getProjectsByCollab(user:string)
  {
    var listTask:any;
    var projet:any;
    var projPrec:any;
    firebase.database().ref('/projects')
    .on('child_added', (data: DataSnapshot)=>{
      projet = data.val();
     
      if (projet.hasOwnProperty("listTask")){

      listTask = projet.listTask;
      if(projPrec != projet)
      {
      for (let t of listTask)
      {
        if(t.collab == user )
        {
         this.projectsCollab.push(new TaskProject(projet.id, projet.name, projet.projectManager, projet.description, projet.state, projet.startDate, projet.estimatedEndDate, t));
         //let taskProj = {"nomProjet": projet.name, "description": projet.description, "CP": projet.projectManager, "task": t  };
         //this.projectsCollab.push(t);
         //console.log(this.projectsCollab);
        }
      }  
     }
    }
      this.emitProjectsCollab(); 
    });
    
  }

  /*getUserBy(mail:string)
  {
    firebase.database().ref('/users').orderByChild("collab").equalTo(mail).on('value', (data: DataSnapshot)=>
    {
      this.current_user = data.val() ? data.val() : [];
      console.log(this.current_user);
    }); 

  }*/

  getUserBy(mail:string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users').orderByChild("email").once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  
/*getProjetTaskUser(mail:string)
{
firebase.database().ref('/projects').orderByChild("projectManager").equalTo(mail)
      .on('child_added', (data: DataSnapshot) => {
         
          var projet = data.val();
          var obj = {"nomProjet": projet.name, "description": projet.description, "CP": projet.projectManager };
          var description = projet.description;
          var mailCP = projet.projectManager;

          firebase.database().ref('/users').orderByChild("email").equalTo(mailCP)
            .once('value', (mediaSnap: DataSnapshot) => {
                console.log(obj.nomProjet + ":" + mediaSnap.val());
              });
        }
      )
}*/

 getProjectsByCP(user:string)
  {
   
    firebase.database().ref('/projects').orderByChild("projectManager").equalTo(user).on('value', (data: DataSnapshot)=>
    {
      this.projectsCP = data.val() ? data.val() : [];
      this.emitProjectsCP();
    });   
   
  }

  constructor(user:string)
  {
      this.getProjects();
      this.getProjectsByCP(user);
      this.getProjectsByCollab(user)
      //this. getProjectsByCollab(user);
  }

}