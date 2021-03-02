import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  pred:Task[]=[new Task(2,'task2','non demarree','',new Date("25 februry 2021"),new Date(),new Date(), new Date()) , new Task(3,'task3','non demarree','',new Date("26 februry 2021"),new Date(),new Date(), new Date())];
  succ:Task[]=[new Task(4,'task4','non demarree','',new Date(),new Date(),new Date("8 april 2021"), new Date()) , new Task(5,'task5','non demarree','',new Date(),new Date(),new Date("9 april 2021"), new Date())];
  task: Task = new Task(1,
                      'tache1',
                      'non demarree',
                      ' Jean Doucet'
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
