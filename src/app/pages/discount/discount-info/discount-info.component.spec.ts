import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountInfoComponent } from './discount-info.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

describe('DiscountInfoComponent', () => {
  let component: DiscountInfoComponent;
  let fixture: ComponentFixture<DiscountInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountInfoComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule

      ]
    });
    fixture = TestBed.createComponent(DiscountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
