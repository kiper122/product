import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersComponent } from './partners.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('PartnersComponent', () => {
  let component: PartnersComponent;
  let fixture: ComponentFixture<PartnersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnersComponent],
      imports:[
        MatDialogModule,
        ReactiveFormsModule
      ]
    });
    fixture = TestBed.createComponent(PartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
