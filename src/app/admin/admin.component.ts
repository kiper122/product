import { Component ,ViewEncapsulation,Renderer2,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AcountService } from '../shared/services/acount/acount.service';
import { AlertExitComponent } from '../pages/alert-exit/alert-exit.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  public w !: number;
  public h !: number;
  constructor(
    private renderer: Renderer2,
    private router:Router,
    private accountService:AcountService,
    private dialog:MatDialog
    ) {
    if (typeof window !== 'undefined') {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (typeof window !== 'undefined') {
      this.h = window.innerHeight;
      this.w = window.innerWidth;
    }
  }
  logout():void{
    this.router.navigate(['']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  };
  openDialogExit():void{
    this.dialog.open(AlertExitComponent, {
      width: '300px',
      backdropClass:'backSaveAllert',
    });
  }

}

