import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  constructor(public task: Task) { }
  tempsConsomme = this.task.estimatedWorkload - this.task.remainingWorkload;
  ngOnInit(): void {
  }

}
