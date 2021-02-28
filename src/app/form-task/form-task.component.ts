import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project';
import { Task } from '../models/task';
import { User } from '../models/user';


@Component({
  selector: 'app-form-task',
  templateUrl: './form-task.component.html',
  styleUrls: ['./form-task.component.scss']
})
export class FormTaskComponent implements OnInit {

  constructor() { }
  public nomTask:string = "";
  public responsable:User = null;
  public chargeEstimee:number = null;
  public startDate:Date = null;
  public end_date:Date = null;
  ngOnInit(): void {
  }

}
