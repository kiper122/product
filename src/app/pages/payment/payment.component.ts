import { Component, HostListener } from '@angular/core';
import { IPaymentResponse } from 'src/app/shared/interfaces/payment/payment.interface';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { PaymentService } from 'src/app/shared/services/paymant/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  public h !: number;
  public w !: number;
  public payments !: IPaymentResponse[];
  constructor(private paymantService:PaymentService){
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
    this.getPayment();
    
  }
  getPayment():void{
    this.paymantService.getAllFarebase().subscribe(data=>{
      this.payments = data as IPaymentResponse[];
    })
  }
}
