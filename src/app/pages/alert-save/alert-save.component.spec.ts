import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertSaveComponent } from './alert-save.component';
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('AlertSaveComponent', () => {
  let component: AlertSaveComponent;
  let fixture: ComponentFixture<AlertSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertSaveComponent,
      ],
      imports:[
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule],
      providers:[
        { provide:MatDialogRef,useValue:{
            close:jasmine.createSpy('close')}},
        MatDialog,
        {provide:Auth,useValue:{} as Auth},
        {provide:Firestore,useValue:{} as Firestore},
        {provide:ToastrService}
      ]

    });
    fixture = TestBed.createComponent(AlertSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
