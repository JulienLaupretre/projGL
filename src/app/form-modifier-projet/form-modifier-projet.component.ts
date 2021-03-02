import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-modifier-projet',
  templateUrl: './form-modifier-projet.component.html',
  styleUrls: ['./form-modifier-projet.component.scss']
})
export class FormModifierProjetComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
