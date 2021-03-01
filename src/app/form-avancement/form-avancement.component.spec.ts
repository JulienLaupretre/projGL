import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAvancementComponent } from './form-avancement.component';

describe('FormAvancementComponent', () => {
  let component: FormAvancementComponent;
  let fixture: ComponentFixture<FormAvancementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAvancementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAvancementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
