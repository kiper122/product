import { TestBed } from '@angular/core/testing';

import { AcountService } from './acount.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AcountService', () => {
  let service: AcountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(AcountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
