import { Component, HostListener, OnDestroy, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interfaces';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
  @ViewChild('slider', { static: true }) slider !: ElementRef;
  public numberDiscounts = 0;
  public isMouseDown = false;
  public startX!: number;
  public scrollLeft!: number;
  public categoryModule !: string;
  public discounts !: IDiscountResponse[];
  public w !: number;
  public h !: number;
  public products !: IProductResponse[];
  private eventSubscription !: Subscription;
  constructor(
    private renderer: Renderer2,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private router: Router,
    private DiscountService: DiscountService,
    private elementRef: ElementRef
  ) {
    if (typeof window !== 'undefined') {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    }
    this.eventSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // this.loadProducts();
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    if (typeof window !== 'undefined') {
      this.h = window.innerHeight;
      this.w = window.innerWidth;
    }
  }
  ngOnInit(): void {
    this.elementRef.nativeElement.scrollTop = 0;
    this.loadProducts();
    this.getRandomDiscounts();
  }
  randomNumber(min: number, max: number): number {
    return Math.round((max - min) * Math.random() + min);
  }
  getRandomDiscounts(): void {
    this.DiscountService.getAllFarebase().subscribe(discounts => {
      this.discounts = discounts as IDiscountResponse[];
    })
  }
  loadProducts(): void {
    const categoryName = this.activatedRoute.snapshot.paramMap.get('category') as string;
    console.log(categoryName)
    // this.productService.getAllByCategory(categoryName).subscribe(data => {
    //   console.log(data)
    //   this.products = data;
    //   this.categoryModule = data[0].category.name
    // });
    this.productService.getAllByCategoryFirebase(categoryName).subscribe(data => {
      this.products = data as IProductResponse[];
      this.categoryModule = this.products[0].category.name
    });
  }
  ngOnDestroy(): void {
    this.eventSubscription.unsubscribe();
  }
  productCount(product: IProductResponse, value: boolean): void {
    if (value) {
      ++product.count;
    }
    else if (!value && product.count > 1) {
      --product.count;
    }
  }
  addToBasket(product: IProductResponse): void {
    let basket: Array<IProductResponse> = [];
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
      basket = JSON.parse(localStorage.getItem('basket') as string);
      if (basket.some(prod => prod.id === product.id)) {
        const index = basket.findIndex(prod => prod.id === product.id);
        basket[index].count += product.count;
      } else {
        basket.push(product);
      }
    } else {
      basket.push(product);
    }
    localStorage.setItem('basket', JSON.stringify(basket));
    product.count = 1;
    this.orderService.changeBasket.next(true);
  }
  onMouseDown(event: MouseEvent): void {
    if (event.target === this.slider.nativeElement) {
      this.handleDragStart(event.pageX, this.slider.nativeElement.offsetLeft);
    }
    this.checkMiddleImage();
  }
  onMouseLeave(): void {
    this.handleDragEnd();
    this.checkMiddleImage();
  }
  onMouseUp(): void {
    this.handleDragEnd();
    this.checkMiddleImage();
  }
  onMouseMove(event: MouseEvent): void {
    this.handleDragMove(event.pageX);
    this.checkMiddleImage();
  }
  onTouchStart(event: TouchEvent): void {
    if (event.target === this.slider.nativeElement) {
      this.handleDragStart(event.touches[0].pageX, this.slider.nativeElement.offsetLeft);
    }
    this.checkMiddleImage();
  }
  onTouchEnd(): void {
    this.handleDragEnd();
    this.checkMiddleImage();
  }
  onTouchMove(event: TouchEvent): void {
    this.handleDragMove(event.touches[0].pageX);
    this.checkMiddleImage();
  }
  private handleDragStart(startX: number, initialOffset: number): void {
    this.isMouseDown = true;
    this.startX = startX - initialOffset;
    this.scrollLeft = this.slider.nativeElement.scrollLeft;
    this.renderer.setStyle(this.slider.nativeElement, 'cursor', 'grabbing');
  }
  private handleDragEnd(): void {
    this.isMouseDown = false;
    this.renderer.setStyle(this.slider.nativeElement, 'cursor', 'grab');
  }
  private handleDragMove(pageX: number): void {
    if (!this.isMouseDown) return;
    const x = pageX - this.slider.nativeElement.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.slider.nativeElement.scrollLeft = this.scrollLeft - walk;
  }
  private checkMiddleImage(): void {
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const middlePosition = this.slider.nativeElement.scrollLeft + sliderWidth / 2;
    for (let i = 0; i < this.discounts.length; i++) {
      const imageWidth = sliderWidth * 1.2; // 45% от ширины слайдера
      const imageStart = i * imageWidth;
      const imageEnd = imageStart + imageWidth;
      if (middlePosition >= imageStart && middlePosition <= imageEnd) {
        console.log(`Image at index ${i} is in the middle.`);
        this.numberDiscounts = i;
        break;
      }
    }
  }
  scrollToImage(index: number): void {
    this.numberDiscounts = index;
    const sliderWidth = this.slider.nativeElement.offsetWidth;
    const imageWidth = sliderWidth * 1.2; // 45% от ширины слайдера
    const targetScrollLeft = index * imageWidth;
    this.slider.nativeElement.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  }
}
