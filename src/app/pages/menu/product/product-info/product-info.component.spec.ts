import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInfoComponent } from './product-info.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";

xdescribe('ProductInfoComponent', () => {
  let component: ProductInfoComponent;
  let fixture: ComponentFixture<ProductInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductInfoComponent],
      imports:[
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ProductInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
