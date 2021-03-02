import { Task } from "./task";
import { Client } from "./client";
import { Contact } from "./contact";


export class TaskProject {
    constructor(
        public id: number,
        public name: string,
        public projectManager : string,
        public description? : string,
        public state? : string,
        public startDate? : Date,
        public actualEndDate? : Date,
        public endDateForSort? : Date,
        public nameTaskForFilter?: string,
        public task? : Task
    ){

    }
}
