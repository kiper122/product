import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authGuard } from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";

describe('authGuard', () => {
    // const executeGuard: CanActivateFn = (...guardParameters) =>
    //   TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  
  let executeGuard: CanActivateFn;
  let authGuardInstance : authGuard


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        RouterTestingModule
      ],
      providers: [authGuard],
    });
    authGuardInstance  =TestBed.inject(authGuard);
  executeGuard =  (...guardParameters) =>  authGuardInstance.canActivate(...guardParameters);
  });

  

  it('should be created', async() => {
   await expect(executeGuard).toBeTruthy();
  });
});
