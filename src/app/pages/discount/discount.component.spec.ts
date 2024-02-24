import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountComponent } from './discount.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DiscountComponent', () => {
  let component: DiscountComponent;
  let fixture: ComponentFixture<DiscountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiscountComponent],
      imports:[
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(DiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
