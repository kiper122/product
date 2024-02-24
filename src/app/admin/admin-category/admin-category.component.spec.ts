import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryComponent } from './admin-category.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ReactiveFormsModule} from "@angular/forms";
import { Storage } from '@angular/fire/storage';


describe('AdminCategoryComponent', () => {
  let component: AdminCategoryComponent;
  let fixture: ComponentFixture<AdminCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminCategoryComponent],
      imports:[
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      providers:[
        {provide:Storage,useValue:{}}
      ]
    });
    fixture = TestBed.createComponent(AdminCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
