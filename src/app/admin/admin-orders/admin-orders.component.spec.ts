import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrdersComponent } from './admin-orders.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('AdminOrdersComponent', () => {
  let component: AdminOrdersComponent;
  let fixture: ComponentFixture<AdminOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminOrdersComponent],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule

      ]
    });
    fixture = TestBed.createComponent(AdminOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
