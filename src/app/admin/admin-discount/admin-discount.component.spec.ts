import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscountComponent } from './admin-discount.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { Storage } from '@angular/fire/storage';
import { FirestoreModule } from '@angular/fire/firestore';

describe('AdminDiscountComponent', () => {
  let component: AdminDiscountComponent;
  let fixture: ComponentFixture<AdminDiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDiscountComponent],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule,
        FirestoreModule
      ],
      providers:[
        {provide:Storage,useValue:{}}
      ]
    });
    fixture = TestBed.createComponent(AdminDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
