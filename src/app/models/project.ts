import { User } from "./user";
import { Task } from "./task";
import { Client } from "./client";
import { Contact } from "./contact";


export class Project {

  constructor(
    public id: number,
    public name: string,
    public projectManager : string,
    public description? : string,
    public state? : string,
    public startDate? : Date,
    public estimatedEndDate? : Date,
    public actualEndDate? : Date,
    public client? : string,
    public contactClient? : Contact, 
    public listTask? : Task[],
  ) {}
  }