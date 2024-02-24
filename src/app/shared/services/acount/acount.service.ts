import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcountService {
  public isUserLogin$ = new Subject<boolean>


  private url = environment.BACKEND_URL;
  private api = {auth:`${this.url}/auth`};
  constructor(private http:HttpClient,
    ) { 
    }
  // login(credential:ILogin):Observable<any>{
  //   return this.http.get(`${this.api.auth}?email=${credential.email}&password=${credential.password}`)
  // }
}
