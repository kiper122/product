import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentComponent } from './payment.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [PaymentComponent]
    });
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
