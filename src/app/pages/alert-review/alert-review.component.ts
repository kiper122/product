import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertSaveComponent } from '../alert-save/alert-save.component';

@Component({
  selector: 'app-alert-review',
  templateUrl: './alert-review.component.html',
  styleUrls: ['./alert-review.component.scss']
})
export class AlertReviewComponent {
  public h !: number;
  public w !: number;
  public reviewForm!:FormGroup;
  public isOneStar = false;
  public isTwoStar = false;
  public isThreeStar = false;
  public isVierStar = false;
  constructor(private fb:FormBuilder,private dialog:MatDialog,private rout:Router){
  if (typeof window !== 'undefined') {
    this.w = window.innerWidth;
    this.h = window.innerHeight;
  }
  };

@HostListener('window:resize', ['$event'])
onresize(event: Event): void {
  if (typeof window !== 'undefined') {
    this.h = window.innerHeight;
    this.w = window.innerWidth;
  }
}
ngOnInit(): void {
  this.initForm();  
}
initForm():void{
  this.reviewForm = this.fb.group({
    comment:['',Validators.required]
  })
}
oneStarClick():void{
  this.isOneStar=true;
  this.isTwoStar=false;
  this.isThreeStar=false;
  this.isVierStar =false;
}
twoStarClick():void{
  this.isOneStar=true;
  this.isTwoStar=true;
  this.isThreeStar=false;
  this.isVierStar =false;
}
threeStarClick():void{
  this.isOneStar=true;
  this.isTwoStar=true;
  this.isThreeStar=true;
  this.isVierStar =false;
}
vierStarClick():void{
  this.isOneStar=true;
  this.isTwoStar=true;
  this.isThreeStar=true;
  this.isVierStar =true;
}
resetReview():void{
  this.reviewForm.reset();
  this.isOneStar=false;
  this.isTwoStar=false;
  this.isThreeStar=false;
  this.isVierStar =false;
  this.dialog.open(AlertSaveComponent,{
    backdropClass:'backSaveAllert',
    panelClass:'frontSaveAllert'
  })
}

}
