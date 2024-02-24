import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  ICategoryResponce } from 'src/app/shared/interfaces/category/category.interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public categories !:ICategoryResponce[];
  public w !: number;
  public h !: number;


    constructor(private activatedRoute:ActivatedRoute,private categorySarvice:CategoryService,private route:Router){
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
