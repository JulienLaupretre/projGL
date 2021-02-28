import { Contact } from "./contact";



export class Client {

  constructor(
    //public id: number,
    public name: string,
    public listContact: Contact[],
    public status : string,
    public companyAdress? : string,
    public activityArea? : string,
    public parentCompany? : string,
  ) {}

  }