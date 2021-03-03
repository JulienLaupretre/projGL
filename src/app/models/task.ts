import { User } from "./user";

export class Task {

    constructor(
      public id: number,
      public name: string,
      public state: string, // "started" "not started" "abandoned" "finished"
      public collab? : string, // email user 
      public startDate? : Date,
      public actualStartDate? : Date,
      public endDate? : Date,
      public actualEndDate? : Date,
      public description? : string,
      public estimatedWorkload? : number,
      public usedWorkload? : number,
      public remainingWorkload? : number,
      public progress? : number, // en pourcentage
      public listTaskPredecessor? : string[],
      public listTaskSuccessor? : string[],
      public listTaskChild? : Task[],
      public niveau? : number, 
    ) {}
  }