import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project';
import { Task } from '../models/task';
import firebase from "firebase/app";
import "firebase/auth";

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit {

  public listTask1 : Task[] = [];
  public listTask2 : Task[] = [];
  public listTask3 : Task[] = [];
  public listTask : Task[] = [];

  constructor(
    public dialogRef: MatDialogRef<ListTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public projet:Project,
  ) { }

  ngOnInit(): void {

    let email = firebase.auth().currentUser.email; 

    this.listTask1 = this.projet.listTask.filter(task => task.collab === email);

    let lt = this.projet.listTask.filter(t => t.listTaskChild != null);
    lt.forEach(t => {
      this.listTask2 = t.listTaskChild.filter(t => t.collab === email);
      }
    );

    lt.forEach(t => {
      let ta = t.listTaskChild.filter(t => t.listTaskChild != null)
      ta.forEach(t => {
        this.listTask3 = this.listTask3.concat(t.listTaskChild.filter(t => t.collab === email))
      });
    }
    );
    
    this.listTask = this.listTask1.concat(this.listTask2).concat(this.listTask3);


  }

}
