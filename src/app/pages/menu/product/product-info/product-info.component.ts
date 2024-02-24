import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.scss']
})
export class ProductInfoComponent {
  public currentProduct !: IProductResponse;
  public w !:number;
  public h !:number;

  public products !:IProductResponse[];

  public Categoryproducts!:any;

  public productsCategoryDOP !:IProductResponse[];

  public productDOPOVNENYA!:IProductResponse[];
  public smakuePRODUCT !:IProductResponse[];

  constructor(private renderer: Renderer2,
    private activatedRoute:ActivatedRoute,
    private productService:ProductService,
    private orderService:OrderService,
    private elementRef: ElementRef
    ){
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
    this.elementRef.nativeElement.scrollTop = 0;
    this.activatedRoute.data.subscribe(response=>{
      this.currentProduct = response['productInfo'];
    })
    console.log(this.currentProduct);
    this.getSmakueProductsCategory(this.currentProduct);
    this.getDopovnenia(this.currentProduct);
    this.loadDopProducts(this.currentProduct);
    // this.productService.getAllByCategoryFirebase(this.currentProduct.category.productDopForCategory).subscribe(data=>{
    // });
    this.loadProducts();
  }
  loadProducts():void{
      this.productService.getAllByCategoryFirebase(this.currentProduct.category.path).subscribe(data=>{
        this.products = data as IProductResponse[];
      }); 
  }
  scrollTop():void{
    this.elementRef.nativeElement.scrollTop = 0;
  }


  getSmakueProductsCategory(product:IProductResponse):void{
    this.productService.getAllByCategoryFirebase(product.category.smakue).subscribe(data=>{
      this.smakuePRODUCT = data as IProductResponse[];
      this.smakuePRODUCT.length = 3;
    })
   
  }
  getDopovnenia(product:IProductResponse):void{
     this.productService.getAllByCategoryFirebase(product.category.productDopForCategory).subscribe(data=>{
      this.productDOPOVNENYA = data as IProductResponse[];
    })
  }

  loadDopProducts(product:IProductResponse):void{
    console.log(this.Categoryproducts);
    this.productService.getAllByCategoryFirebase(product.category.productDopForCategory).subscribe(data=>{
      // this.productDOPOVNENYA = data as IProductResponse[];
    })
  }
  productCount(product:IProductResponse,value:boolean):void{
    if(value){
      ++product.count;
    }
    else if(!value && product.count>1){
      --product.count;
    }
  }
  addToBasket(product:IProductResponse):void{
    let basket  : Array<IProductResponse> = [];
    if(localStorage.length>0 && localStorage.getItem('basket')){
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if(basket.some(prod => prod.id === product.id)){
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count+= product.count;
      }else{
        basket.push(product);
      }
    }else{
      basket.push(product);
    }
    localStorage.setItem('basket',JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
  randomNumber(min:number,max:number):number{
    return Math.round((max-min)*Math.random()+min);
  }
}
