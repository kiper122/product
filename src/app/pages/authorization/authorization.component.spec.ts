import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizationComponent } from './authorization.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { ToastrModule, ToastrService } from 'ngx-toastr';

xdescribe('AuthorizationComponent', () => {
  let component: AuthorizationComponent;
  let fixture: ComponentFixture<AuthorizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorizationComponent],
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
        {provide:ToastrService,useClass:{ToastrService}}
      ]
    });
    fixture = TestBed.createComponent(AuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
