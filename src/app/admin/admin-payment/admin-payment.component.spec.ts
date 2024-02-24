import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentComponent } from './admin-payment.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { Storage } from '@angular/fire/storage';

describe('AdminPaymentComponent', () => {
  let component: AdminPaymentComponent;
  let fixture: ComponentFixture<AdminPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminPaymentComponent],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage,useValue:{}}
      ]
    });
    fixture = TestBed.createComponent(AdminPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
