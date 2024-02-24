import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutComponent } from './checkout.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutComponent],
      imports:[
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot()],
      providers:[
        { provide:MatDialogRef,useValue:{
            close:jasmine.createSpy('close')}},
        MatDialog,
        {provide:Auth,useValue:{} as Auth},
        {provide:Firestore,useValue:{} as Firestore},
        {provide:ToastrService}
      ]
    });
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
