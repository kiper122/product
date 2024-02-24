import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDialogComponent } from './auth-dialog.component';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AuthDialogComponent', () => {
  let component: AuthDialogComponent;
  let fixture: ComponentFixture<AuthDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthDialogComponent],
      imports:[
        HttpClientTestingModule,
        MatFormFieldModule,
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatDialogModule,
        ToastrModule,
        BrowserAnimationsModule
        
        
      ],
      providers:[
        {provide:MatDialogRef,useValue:{} as  MatDialogRef<AuthDialogComponent>},
        {provide:Auth,useValue:{} as Auth},
        {provide:Firestore,useValue:{} as Firestore},
        {provide:ToastrService,useClass:ToastrService}
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AuthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
