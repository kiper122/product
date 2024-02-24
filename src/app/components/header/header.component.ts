import { Component ,ViewEncapsulation,Renderer2,HostListener} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { OrderService } from 'src/app/shared/services/order/order.service';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { AcountService } from 'src/app/shared/services/acount/acount.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { AlertReviewComponent } from 'src/app/pages/alert-review/alert-review.component';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interfaces';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  public total = 0;
  public infoPanelActive :boolean = false;
  public isBllockElement: boolean = false;
  public width !: number;
  public height !: number;
  public basket:Array<IProductResponse> = [];
  public loginUrl = 'admin';
  public loginPage = 'Admin';
  public isLogin = false;
  public isCabinetOderAdmin = false;
  public categories!:ICategoryResponce[];
  constructor(
    private renderer: Renderer2,
    private orderService:OrderService,
    private categoryService:CategoryService,
    private accountService:AcountService,
    private dialog:MatDialog,
    ) {
    // Проверяем наличие window перед его использованием
    if (typeof window !== 'undefined') {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    // Проверяем наличие window перед его использованием
    if (typeof window !== 'undefined') {
      this.height = window.innerHeight;
      this.width = window.innerWidth;
    }
  }
  ngOnInit(): void {
    this.loadBasket();
    this.updateBasket();
    this.checkYserLogin();
    this.checkUpdateUserLogin();
    this.getCategory();
  }
  getCategory():void{
    this.categoryService.getAllFarebase().subscribe(data=>{
      this.categories = data  as ICategoryResponce[];
    })
  }
  
  panelActive() :void{
    this.infoPanelActive = !this.infoPanelActive;
    this.isBllockElement = !this.isBllockElement;
  }
  closePanel() : void{
    this.infoPanelActive = false;
    this.isBllockElement = false;
  }
  loadBasket():void{
    if(localStorage.length>0 && localStorage.getItem('basket')){

      this.basket = JSON.parse(localStorage.getItem('basket') as string);
      }
      this.getTotalPrice();
    }
    getTotalPrice():void{
      this.total = this.basket.
      reduce((total:number,prod:IProductResponse)=>total + prod.count,0)
    }
    updateBasket():void{
      this.orderService.changeBasket.subscribe(()=>{
        this.loadBasket();
      })
    }
    checkYserLogin():void{
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
      if(currentUser && currentUser.role === ROLE.ADMIN){
        this.isLogin = true;
        this.loginUrl = 'admin';
        this.loginPage = 'Admin';
        this.isCabinetOderAdmin = true;
      }
      else if(currentUser && currentUser.role === ROLE.USER){
        this.isLogin = false;
        this.loginUrl = 'cabinet';
        this.loginPage = 'cabinet';
        this.isCabinetOderAdmin = true;
      }
      else{
        this.isLogin = false;
        this.loginUrl = '';
        this.loginPage = '';
        this.isCabinetOderAdmin = false;
      }
    }
    checkUpdateUserLogin():void{
      this.accountService.isUserLogin$.subscribe(()=>{
        this.checkYserLogin();
      })
    }
    openDialog(): void {
      this.dialog.open(AuthDialogComponent, {
        backdropClass:'dialog-back',
        panelClass:'auth-dialog',
        autoFocus:false
      }).afterClosed().subscribe(result=>{
        console.log(result)
      })
    }
    openReview():void{
      this.closePanel();
      this.dialog.open(AlertReviewComponent,{
        width:'500px',
        autoFocus:false
      });
    }
}
