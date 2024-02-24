import { Component ,HostListener} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IOrderResponse } from 'src/app/shared/interfaces/orders/order.interfaces';
import { CheckboxService } from 'src/app/shared/services/checkbox/checkbox.service';



@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  public w !: number;
  public orderForm !: FormGroup;
  public isOrderInfo = false;
  public ordrers !: IOrderResponse[];
  public orderInfo !: IOrderResponse;
    public h !: number;
    constructor(private checkBoxService:CheckboxService,private fb:FormBuilder) {
      if (typeof window !== 'undefined') {
        this.w = window.innerWidth;
        this.h = window.innerHeight;
      }
    }
  
    @HostListener('window:resize', ['$event'])
    onResize(): void {
      if (typeof window !== 'undefined') {
        this.h = window.innerHeight;
        this.w = window.innerWidth;
      }
    }
    ngOnInit(): void {
      this.getOrders()
    }
    getOrders():void{
      this.checkBoxService.getAllFarebase().subscribe(data=>{
        this.ordrers = data as IOrderResponse[];
      })
    }
    infoUserOrder(order:IOrderResponse):void{
      this.orderInfo = order;
      this.initCheckoutForm();
      this.isOrderInfo = true;
    }
    closeOrderInfo():void{
      this.isOrderInfo = false;
    }
    initCheckoutForm():void{
      this.orderForm = this.fb.group({
        name: [this.orderInfo.name],
        phoneNumbers:[this.orderInfo.phoneNumbers],
        Citi:[this.orderInfo.Citi],
        Street:[this.orderInfo.Street],
        numbersHome:[this.orderInfo.numbersHome],
        Entrance:[this.orderInfo.Entrance],
        Floot:[this.orderInfo.Floot],
        Entryphone:[this.orderInfo.Entryphone],
        kv:[this.orderInfo.kv]
      })
    }
    deleteOrder(order:IOrderResponse):void{
      this.checkBoxService.deleteFirebase(order.id).then(data=>{
      this.getOrders()
      })
    }

}
