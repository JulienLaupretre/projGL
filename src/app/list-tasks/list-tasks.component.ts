import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../models/project';
import { Task } from '../models/task';
import firebase from "firebase/app";
import "firebase/auth";
import { TaskComponent } from '../task/task.component';

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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    let email = firebase.auth().currentUser.email; 

    this.listTask1 = this.projet.listTask.filter(task => task.collab === email);

    let lt = this.projet.listTask.filter(t => t.hasOwnProperty('listTaskChild'));
    lt.forEach(t => {
      this.listTask2 = this.listTask2.concat(t.listTaskChild.filter(t => t.collab === email));
      }
    );

    lt.forEach(t => {
      let ta = t.listTaskChild.filter(t => t.hasOwnProperty('listTaskChild'))
      
      ta.forEach(t => {
        this.listTask3 = this.listTask3.concat(t.listTaskChild.filter(t => t.collab === email))
      });
    }
    );

    this.listTask = this.listTask1.concat(this.listTask2).concat(this.listTask3);
  }

  open(task : Task){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "60%";

    dialogConfig.data = {t : task, p : this.projet};

    this.dialog.open(TaskComponent, dialogConfig);
  }

}
