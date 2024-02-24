import { Component, HostListener, Renderer2 } from '@angular/core';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent {
  public userDiscount !:Array<IDiscountResponse>;
  public w !: number;
  public h !: number;

  constructor(private discountsService:DiscountService,private renderer: Renderer2){
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
    this.getDiscounts();
  }
  getDiscounts():void{
    this.discountsService.getAllFarebase().subscribe(data=>{
      this.userDiscount = data as IDiscountResponse[];
    })
  }

}
