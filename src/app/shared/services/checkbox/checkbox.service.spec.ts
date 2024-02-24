import { TestBed } from '@angular/core/testing';

import { CheckboxService } from './checkbox.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('CheckboxService', () => {
  let service: CheckboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CheckboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
