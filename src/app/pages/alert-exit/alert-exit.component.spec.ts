import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertExitComponent } from './alert-exit.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AlertExitComponent', () => {
  let component: AlertExitComponent;
  let fixture: ComponentFixture<AlertExitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertExitComponent],
      imports:[
        HttpClientTestingModule
      ]
    });
    fixture = TestBed.createComponent(AlertExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
