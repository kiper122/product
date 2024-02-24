import { Component, HostListener, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ICategoryResponce } from 'src/app/shared/interfaces/category/category.interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  public categories !:ICategoryResponce[];
  public w !: number;
  public h !: number;


    constructor(private activatedRoute:ActivatedRoute,private renderer: Renderer2,private categorySarvice:CategoryService,private route:Router){
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
    this.loadCategories();
    this.route.navigate(['/menu']);

  }
  loadCategories(): void {
    this.categorySarvice.getAllFarebase().subscribe(data => {
      this.categories = data as ICategoryResponce[];
    });
  }


}
