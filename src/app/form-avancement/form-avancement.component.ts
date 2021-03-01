import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-avancement',
  templateUrl: './form-avancement.component.html',
  styleUrls: ['./form-avancement.component.scss']
})
export class FormAvancementComponent implements OnInit {

  progressForm: FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.initForm()
  }

  initForm() {
    this.progressForm = this.formBuilder.group({
      progress: ['', Validators.required],
      usedWorkload: ['', Validators.required],
      remainingWorkload : ['', Validators.required],
      comment: ''
    });
  }

  onSave()
  {
    const progress = this.progressForm.get('progress').value;
    const usedWorkload = this.progressForm.get('usedWorkload').value;
    const remainingWorkload = this.progressForm.get('remainingWorkload').value;
    const comment = this.progressForm.get('comment').value;
    //const newAvancement = new Avancement(progress, usedWorkload, remainingWorkload);
    //newAvancement.comment = comment;
    //this.dashBoardService.createNewAvancement(newAvancement);
    //this.router.navigate(['/avancements']);
  }

  
}

