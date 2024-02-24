import { CanActivateFn, Route, UrlTree } from '@angular/router';
import { config } from 'rxjs';
import { ROLE } from '../../constants/role.constants';
import { Router } from '@angular/router';
import {Injectable} from '@angular/core'
import {ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot} from '@angular/router'
import { Observable} from 'rxjs'

 @Injectable({
  providedIn:'root'
 })
export class authGuard implements CanActivate{
  constructor(
    private route:Router
  ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state:RouterStateSnapshot): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if(currentUser && (currentUser.role === ROLE.ADMIN)){
        return true;
      }
      this.route.navigate(['/auth']);
        return false;
    }
}
