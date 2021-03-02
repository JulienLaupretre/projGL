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
  projectsCP:TaskProject[] = [];
  projectsCollab: TaskProject[] = [];
  tasks : Task[] = [];
  avancements:any;
  projectSubject = new Subject<Project[]>();
  projectCPSubject = new Subject<TaskProject[]>();
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

  parcoursSousTache(projet:Project, listTask : Task[], user:String)
  {
    for (let t of listTask)
      {
        if(t.hasOwnProperty('listTaskChild'))
        {
          this.parcoursSousTache(projet,t.listTaskChild, user);
        }
        else
        {
          if(t.collab==user)
          {
            this.projectsCollab.push(new TaskProject(projet.id, projet.name, projet.projectManager, projet.description, projet.state, projet.startDate, projet.estimatedEndDate,  t.endDate, t.name, t));
          }
        }
      }
  }

  parcoursSousTacheCP(projet:Project, listTask : Task[])
  {
    for (let t of listTask)
      {
        if(t.hasOwnProperty('listTaskChild'))
        {
          this.parcoursSousTacheCP(projet,t.listTaskChild);
        }
        else
        {
          this.projectsCP.push(new TaskProject(projet.id, projet.name, projet.projectManager, projet.description, projet.state, projet.startDate, projet.estimatedEndDate,  t.endDate, t.name, t));
        }
      }
  }
  
  getProjectsByCollab(user:string)
  {
    var listTask:any;
    var projet:any;
    var projPrec:any;
    firebase.database().ref('/projects')
    .on('child_added', (data: DataSnapshot)=>{
      
      projet = data.val();
     
      listTask = projet.listTask;
      this.parcoursSousTache(projet,listTask,user);
      this.emitProjectsCollab(); 
    });
    
  }

  /*getUserBy(mail:string)
  {
    firebase.database().ref('/users').orderByChild("email").equalTo(mail)
    .on('value', (data: DataSnapshot)=>
    {
      this.current_user = data.val() ? data.val() : [];
      console.log(this.current_user);
    }); 

  }*/



  
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
   
    firebase.database().ref('/projects').orderByChild("projectManager").equalTo(user).on('child_added', (data: DataSnapshot)=>
    {
      var projet = data.val() ? data.val() : [];
      var listTask = projet.listTask;
      this.parcoursSousTacheCP(projet, listTask);
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