import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AcountService } from 'src/app/shared/services/acount/acount.service';

@Component({
  selector: 'app-alert-exit',
  templateUrl: './alert-exit.component.html',
  styleUrls: ['./alert-exit.component.scss']
})
export class AlertExitComponent {
  constructor(private accountService:AcountService,private router:Router){}
  exit():void{
    this.router.navigate(['/menu']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
  
}
