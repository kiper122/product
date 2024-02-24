import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertOrderComponent } from './alert-order.component';

describe('AlertOrderComponent', () => {
  let component: AlertOrderComponent;
  let fixture: ComponentFixture<AlertOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlertOrderComponent]
    });
    fixture = TestBed.createComponent(AlertOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
