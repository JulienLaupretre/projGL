import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  pred:string[]=['Tâche 2','Tâche 3'];
  succ:string[]=['Tâche 3','Tâche 4'];
  task: Task = new Task(1,
                      'tache1',
                      'non demarree',
                      'Jean Doucet'
                      , new Date(),new Date()
                      ,new Date("1 april 2021"),new Date("1 april 2021"),
                      '', 7 , 4 , 3 , 49,
                      this.pred,this.succ,[],
                      0);
  
  constructor() { }
  
  ngOnInit(): void {
    
  }

  toStringDate (date:Date){
   var s = date.getDay()+'/'+date.getMonth()+'/'+date.getFullYear();
   return s;
  }

  start(){
    if(confirm("Voulez-vous vraiment démarrer cette tâche ?")){
      this.task.state="demarree";
      // save la modif 
    }
  }
}
