import { Component, Inject, OnInit } from '@angular/core';
import { FormArray,FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../models/client';
import { ClientsService } from '../services/clients.service';
import { Router } from '@angular/router';
import { Contact } from '../models/contact';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  MesClients: Client[]=[];
  clientForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private clientsService:ClientsService,
              public dialogRef: MatDialogRef<FormClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data:Client 
            ){}
 
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {

    
    if(this.data==null){


      this.clientForm = this.formBuilder.group({
        name: ['', Validators.required],
        status: 'actif',
        companyAdress: '',
        activityArea: '',
        parentCompany: '',
        listContact: this.formBuilder.array([
          this.formBuilder.group({
            firstName: ["", Validators.required],
            lastName: ["", Validators.required],
            email:["", [Validators.required, Validators.email]],
            phoneNumber:[""],
          })
        ],Validators.required)
      });


    }else{
    this.clientForm = this.formBuilder.group({
      name: [this.data.name, Validators.required],
      status: this.data.status,
      companyAdress: this.data.companyAdress,
      activityArea: this.data.activityArea,
      parentCompany: this.data.parentCompany,
      listContact: this.formBuilder.array([
        this.formBuilder.group({
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          email:["", [Validators.required, Validators.email]],
          phoneNumber:[""],
        })
      ],Validators.required)
    });
    
    let lcts=this.data.listContact? this.data.listContact : [];
    this.clientForm.setControl('listContact',this.setContacts(lcts))
    }
  }

  setContacts(Ctab:Contact[]):FormArray{
    const formArray = new FormArray([]);

    for(let i=0; i<Ctab.length; i++){

      formArray.push( this.formBuilder.group({
        firstName:Ctab[i].firstName ,
        lastName: Ctab[i].lastName,
        email:Ctab[i].email,
        phoneNumber:Ctab[i].phoneNumber
      }));

    }

    /*Ctab.forEach(c=>{
     formArray.push( this.formBuilder.group({
        firstName:c.firstName ,
        lastName: c.lastName,
        email:c.email,
        phoneNumber:c.phoneNumber
      }));
    });*/


    return formArray;
  }

  getContacts(){
    return this.clientForm.get('listContact') as FormArray;
  }

  addClient() {
    const newClientcontrol = this.formBuilder.group({
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email:["",[Validators.required, Validators.email]],
        phoneNumber:[""]
    });
    this.getContacts().push(newClientcontrol);


  }

  
  onSaveClient() {
    const form = this.clientForm;
    var Contacts : Contact [] =[];
    const c = this.clientForm.get('listContact');

    for(let i=0 ; i<c.value.length ; i++){
      Contacts.push(new Contact(c.value[i].firstName,c.value[i].lastName,c.value[i].email,c.value[i].phoneNumber))
    }
    
    const newClient = new Client(form.get('name').value,
                                 Contacts,
                                 form.get('status').value,
                                 form.get('companyAdress').value,
                                 form.get('activityArea').value,
                                 form.get('parentCompany').value);
    this.MesClients.push(newClient);
    this.clientsService.createNewClient(newClient);
    this.dialogRef.close(); 
    }


    removeItem(index:number){
      const contacts=this.getContacts();
      contacts.removeAt(index);
      contacts.markAsDirty();
      contacts.markAsTouched();
    }

    /*get name(){
      return this.clientForm.get('name');
    }*/

 
  
  }

 

 








