import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistrationComponent } from './dialog-registration.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DialogRegistrationComponent', () => {
  let component: DialogRegistrationComponent;
  let fixture: ComponentFixture<DialogRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRegistrationComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatDialogModule,
        ToastrModule
      ],
      providers:[
        {provide:MatDialogRef,useValue:{} as MatDialogModule},
        {provide:Auth,useValue:{} as Auth},
        {provide:Firestore,useValue:{} as Firestore},
        {provide:ToastrService,useValue:{}}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(DialogRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
