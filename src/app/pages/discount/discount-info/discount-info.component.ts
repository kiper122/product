import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';


@Component({
  selector: 'app-discount-info',
  templateUrl: './discount-info.component.html',
  styleUrls: ['./discount-info.component.scss']
})
export class DiscountInfoComponent {

  public discount!: IDiscountResponse;
  constructor(private discountService:DiscountService,private activatedRoute:ActivatedRoute){}
  ngOnInit(): void {
    this.getOneDiscount();
  }

  getOneDiscount():void{
    const DISCOUNT_ID = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.discountService.getOneFirebase(DISCOUNT_ID).subscribe(data=>{
      this.discount = data as IDiscountResponse;
    })
  }
}
