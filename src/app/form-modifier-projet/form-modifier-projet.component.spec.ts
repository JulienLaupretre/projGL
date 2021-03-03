import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormModifierProjetComponent } from './form-modifier-projet.component';

describe('FormModifierProjetComponent', () => {
  let component: FormModifierProjetComponent;
  let fixture: ComponentFixture<FormModifierProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormModifierProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormModifierProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
