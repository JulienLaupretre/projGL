export class User {

    constructor(
        //public id: number,
        public email : string,
        public firstName: string,
        public lastName : string,
        public position : string, //fonction de l'employé
        public listStatus : string[],
        public startDate : Date, //auto filled 
        public birthdate? : Date,
        public birthplace? : string,
        public gender? : string,
        public department? : string, //service de l'entreprise
        public address? : string,
        public phone? : string,
        public endDate? : Date, //Date de départ
    ) {}
  }