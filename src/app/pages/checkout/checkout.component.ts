import { Component, HostListener } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, NumberValueAccessor, Validators ,ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IOrderReques } from 'src/app/shared/interfaces/orders/order.interfaces';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { AcountService } from 'src/app/shared/services/acount/acount.service';
import { CheckboxService } from 'src/app/shared/services/checkbox/checkbox.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { AlertOrderComponent } from '../alert-order/alert-order.component';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  public totalDiscounts  = 0;
  public discounts!:IDiscountResponse[];
  public basket: Array<IProductResponse> = [];
  public h !: number;
  public checkoutForm !: FormGroup;
  public w !: number;
  private productDelete!: string;
  public isProduct = false;
  public total = 0;
  constructor(private orderService: OrderService,
    private checkboxService: CheckboxService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private afs: Firestore,
    private dialog:MatDialog,
    private discountnService:DiscountService
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
  ngOnInit(): void {
    this.initCheckoutForm();
    this.loadBasket();
    this.updateBasket();
    this.initUsers();
    this.initDiscounts();
  }
  initDiscounts():void{
    this.discountnService.getAllFarebase().subscribe(data=>{
      this.discounts = data as IDiscountResponse[];
    })
  }
  initCheckoutForm(): void {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      phoneNumbers: ['', Validators.required],
      Citi: ['', Validators.required],
      Street: ['', Validators.required],
      numbersHome: ['', Validators.required],
      Entrance: [''],
      Floot: [''],
      Entryphone: [''],
      kv: ['']
    })
  }
  loadBasket(): void {

    const storedString = localStorage.getItem('basket');

    if (storedString === null || storedString.trim() === '') {
      this.isProduct = false;
    } else {
      const storedArray = JSON.parse(storedString);

      if (Array.isArray(storedArray) && storedArray.length === 0) {
        this.isProduct = false;
      } else {
        this.isProduct = true;
      }
    }

    if (localStorage.length > 0 && localStorage.getItem('basket')) {

      this.basket = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
  getTotalPrice(): void {
    this.total = this.basket.
      reduce((total: number, prod: IProductResponse) => total + (prod.count * (prod.discount ? (prod.price - prod.discount) : prod.price)), 0);

    this.totalDiscounts = this.basket.
      reduce((total: number, prod: IProductResponse) => total + (prod.discount?(prod.discount * prod.count):0), 0);

  }
  updateBasket(): void {
    this.orderService.changeBasket.subscribe(() => {
      this.loadBasket();

    })
  }
  deleteProduct(nameProduct: string): void {
    this.productDelete = nameProduct;
    const productIndexToRemove = this.basket.findIndex(product => product.name === nameProduct);
    if (productIndexToRemove !== -1) {
      this.basket.splice(productIndexToRemove, 1);
      localStorage.setItem('basket', JSON.stringify(this.basket));
      if (localStorage.length > 0 && localStorage.getItem('basket')) {
        this.isProduct = true;
      }
      else {
        this.isProduct = false;
      }
    }
    else {
      this.toastr.error('error');
    }
    this.orderService.changeBasket.next(true);
  }

  productCount(productN: IProductResponse, value: boolean): void {
    let quantityToAdd = 0;
    const existingProductionIndex = this.basket.findIndex(product => product.name == productN.name);
    if (value) {
      quantityToAdd = 1;
    }
    else if (!value && productN.count > 1) {
      quantityToAdd = -1;
    }
    if (existingProductionIndex !== -1) {
      this.basket[existingProductionIndex].count += quantityToAdd;
    }
    localStorage.setItem('basket', JSON.stringify(this.basket));
    this.orderService.changeBasket.next(true);
  }

  submitCheckbox(): void {
    const user: IOrderReques = {
      name: this.checkoutForm.get('name')?.value,
      phoneNumbers: this.checkoutForm.get('phoneNumbers')?.value,
      Citi: this.checkoutForm.get('Citi')?.value,
      Street: this.checkoutForm.get('Street')?.value,
      numbersHome: this.checkoutForm.get('numbersHome')?.value,
      Entrance: this.checkoutForm.get('Entrance')?.value,
      Floot: this.checkoutForm.get('Floot')?.value,
      Entryphone: this.checkoutForm.get('Entryphone')?.value,
      kv: this.checkoutForm.get('kv')?.value,
      products:this.basket,
      total:this.total
    }
    this.checkboxService.createFirebase(user).then(() => {
      console.log(200);
    });
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      const productUser : Array<IProductResponse> = parsedObject['orders'];
      let newProducts = productUser;
      this.basket.forEach((a)=>{
        newProducts.push(a);
      })
      const newOrderProduct ={
        orders:newProducts
      }
      this.updateUserData(uid, newOrderProduct);

      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        const currentUser = { ...user, uid: uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser)
        )})
    }


    localStorage.setItem('basket', JSON.stringify([]));
    this.checkoutForm.reset();
    this.orderService.changeBasket.next(true);
    this.openAlertOdrer()
  }
  openAlertOdrer():void{
    this.dialog.open(AlertOrderComponent,{
      width:'500px',
      height:'200px'
    })
  }

 
  async updateUserData(uid: string, newData: any): Promise<void> {
    const userRef = doc(this.afs, 'users', uid);

    try {
      await setDoc(userRef, newData, { merge: true });
    } catch (error) {
      console.error('Ошибка при обновлении данных пользователя:', error);
    }
  }
  initUsers(): void {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        if (user) {
          this.checkoutForm = this.fb.group({
            name: [`${user['firstName']} ${user['lastName']}`, Validators.required],
            phoneNumbers: [user['phoneNumber'], Validators.required],
            Citi: [user['Citi'], Validators.required],
            Street: [user['Street'], Validators.required],
            numbersHome: [user['numbersHome'], Validators.required],
            Entrance: [user['Entrance']],
            Floot: [user['Floot']],
            Entryphone: [user['Entryphone']],
            kv: [user['kv']]
          })
        }
      })
    }
  }
}
