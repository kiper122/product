import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertReviewComponent } from './alert-review.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AlertReviewComponent', () => {
  let component: AlertReviewComponent;
  let fixture: ComponentFixture<AlertReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertReviewComponent],
      imports:[
        MatDialogModule
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AlertReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
