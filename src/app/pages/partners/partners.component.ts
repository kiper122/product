import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertSaveComponent } from '../alert-save/alert-save.component';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.scss']
})
export class PartnersComponent {
  public partnersForm !: FormGroup;
  public h!: number;
  public w!: number;
  constructor(private fb:FormBuilder,private router:Router,private dialog:MatDialog){
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
  ngOnInit(): void {
    this.initForm();
    
  }
  initForm():void{
    this.partnersForm = this.fb.group({
      name:['',Validators.required],
      phoneNumber:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      comment:['',Validators.required]
    })
  }
  submitForm():void{
    this.partnersForm.reset();
    this.router.navigate(['/menu']);
    this.dialog.open(AlertSaveComponent,{
      backdropClass:'backSaveAllert',
      panelClass:'frontSaveAllert'
    }); 
  }
}
