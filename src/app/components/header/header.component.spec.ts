import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from "@angular/material/dialog";
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports:[
        HttpClientTestingModule,
        MatDialogModule
      ],
      schemas:[NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
