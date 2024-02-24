import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinetComponent } from './cabinet.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';

describe('CabinetComponent', () => {
  let component: CabinetComponent;
  let fixture: ComponentFixture<CabinetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinetComponent],
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
      ]
    });
    fixture = TestBed.createComponent(CabinetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
