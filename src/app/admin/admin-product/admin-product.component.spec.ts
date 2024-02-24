import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProductComponent } from './admin-product.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import { Storage } from '@angular/fire/storage';

describe('AdminProductComponent', () => {
  let component: AdminProductComponent;
  let fixture: ComponentFixture<AdminProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      declarations: [AdminProductComponent],
      providers:[
        {provide:Storage,useValue: {}}
      ]
    });
    fixture = TestBed.createComponent(AdminProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
