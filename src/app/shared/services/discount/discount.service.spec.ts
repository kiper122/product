import { TestBed } from '@angular/core/testing';

import { DiscountService } from './discount.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('DiscountService', () => {
  let service: DiscountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(DiscountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
