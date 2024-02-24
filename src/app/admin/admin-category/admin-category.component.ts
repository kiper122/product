import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryRequest, ICategoryResponce } from 'src/app/shared/interfaces/category/category.interfaces';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage'
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { ProductService } from 'src/app/shared/services/product/product.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent {
  public w !: number;
  public h !: number;
  public disabledAddImgCategory = false;
  public categoryForm !: FormGroup;
  public url = '';
  public deleteImgUrl = '';
  public isBorderFoto = true;
  public isGlobalAllert = false;
  public isInfoImage = false;
  public isDeleteImage = false;
  public adminCategories !: Array<ICategoryResponce>;
  public editStatus = false;
  private currentCategoryID = '';
  private deleteCategoryID = '';
  public isdeleteCategory = false;
  public uploadPercent !: number;
  public isProgressImg = false;
  public isTextFoto = true;
  public isEditFoto = false;
  public isFirstFoto = true;
  constructor(private fb: FormBuilder, private categoryService: CategoryService, private storage: Storage,private productService:ProductService) {
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
    this.initCategoryForm();
    this.loadCategories();
  }
  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null,  Validators.required],
      imagePath: [null, this.isEditFoto ? null : Validators.required],
      dopCategory:[false],
      productDopForCategory:[''],
      smakue:['']
    })
  }
  loadCategories(): void {
    // this.categoryService.getAll().subscribe(data => {
    //   this.adminCategories = data;
    // });
    this.categoryService.getAllFarebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponce [];
    });
  }
  clickInfoFoto(): void {
    this.isInfoImage = true;
    this.isGlobalAllert = true;
    this.isDeleteImage = false;
  }
  closeGlobalAllert(): void {
    this.isInfoImage = false;
    this.isdeleteCategory = false;
    this.isDeleteImage = false;
    this.isGlobalAllert = false
  }
  clickDeleteFoto(): void {
    this.isGlobalAllert = true;
    this.isDeleteImage = true;
    this.isInfoImage = false;
  }
  resetImageForm(): void {
    this.url = '';
    this.isTextFoto = true;
    this.isBorderFoto = true;
    this.categoryForm.patchValue({
      imagePath: null
    })
  }
  addCategory(): void {
    if (this.editStatus) {
      const updateCategory : ICategoryRequest ={
        name:this.categoryForm.get('name')?.value,
        path:this.categoryForm.get('path')?.value,
        imagePath:this.url,
        dopCategory:this.categoryForm.get('dopCategory')?.value,
        productDopForCategory:this.categoryForm.get('productDopForCategory')?.value,
        smakue:this.categoryForm.get('smakue')?.value
      }
      let k !: IProductResponse[];
      this.productService.getAllByCategoryFirebase(updateCategory.path).subscribe(data=>{
        k = data as IProductResponse[];
        for(let i = 0;i<k.length;i++){
          k[i].category.name = updateCategory.name;
          k[i].category.productDopForCategory = updateCategory.productDopForCategory;
          k[i].category.smakue = updateCategory.smakue;
          this.productService.updateFirebase(k[i],k[i].id).then();
        }
      })
      this.categoryService.updateFirebase(updateCategory, this.currentCategoryID).then(() => {
        this.loadCategories()
      })
    }
    else {
      const newCategory : ICategoryRequest = {
        name:this.categoryForm.get('name')?.value,
        path:this.categoryForm.get('path')?.value,
        imagePath:this.url,
        dopCategory:this.categoryForm.get('dopCategory')?.value,
        productDopForCategory:this.categoryForm.get('productDopForCategory')?.value,
        smakue:this.categoryForm.get('smakue')?.value
      }
      // this.categoryService.create(newCategory).subscribe(() => {
      //   this.loadCategories();
      // })
      this.categoryService.createFirebase(newCategory).then(() => {
        this.loadCategories();
      })
    }
    this.resetImageForm();
    this.categoryForm.reset();
    this.editStatus = false;
    this.isFirstFoto = true;
    this.disabledAddImgCategory = false;
  }
  editCategory(category: ICategoryResponce): void {
    this.currentCategoryID = category.id;
    this.editStatus = true;
    this.isTextFoto = false;
    this.isBorderFoto = false;
    this.url = category.imagePath;
    this.isEditFoto = true;
    this.initCategoryForm();
    this.categoryForm.patchValue({
      name:category.name,
      path:category.path,
    });
    this.disabledAddImgCategory = true;
  }
  upload(event: any): void {
    this.disabledAddImgCategory = true;
    const file = event.target.files[0];
    this.uploadFile('categories', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imahePath: data
        });
        this.isFirstFoto = false;
      })
      .catch(err => {
        console.log(err);
      })
      this.isFirstFoto = false;
      this.disabledAddImgCategory = true;
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    this.isProgressImg = true;
    const path = `${folder}/${name}`;
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        this.url = await getDownloadURL(storageRef);
        this.isTextFoto = false;
        this.isBorderFoto = false;
        this.isProgressImg = false;
      } catch (e: any) {
        console.log(e);
      }
    }
    else {
      console.log('wrong format');
    }
    return Promise.resolve(this.url);
  }
  deleteIIIMM(urlImg?:string): void {
    let deleteUrlImg = urlImg? urlImg : this.url;
    const task = ref(this.storage, deleteUrlImg);
    deleteObject(task).then(() => {
      console.log('File deletet');
      this.uploadPercent = 0;
      this.resetImageForm();
      this.closeGlobalAllert();
      this.uploadPercent = 0;
      this.categoryForm.patchValue({
        imagePath: null
      });
    })
      .catch(err => {
        console.log(err);
      })
      this.isFirstFoto = true;
      this.disabledAddImgCategory = false;
      this.isEditFoto = false;
      console.log(this.isEditFoto);
  }
  async getImageFromStorage(url: string): Promise<string> {
    try {
      const task = ref(this.storage);
      const imageUrl = await getDownloadURL(task);
      return imageUrl;
    } catch (error) {
      console.error('Ошибка при получении изображения:', error);
      throw error;
    }
  }
//deleteCategory final
  deleteCategory(): void {
    this.deleteIIIMM(this.deleteImgUrl);
    this.categoryService.deleteFirebase(this.deleteCategoryID).then(() => {
      this.loadCategories();
    })
    this.isdeleteCategory = false;
    this.isGlobalAllert = false;
    this.isFirstFoto = true;
  }
  clickDeleteCategory(category: ICategoryResponce): void {
    this.deleteImgUrl = category.imagePath;
    this.isGlobalAllert = true;
    this.deleteCategoryID = category.id;
    this.isdeleteCategory = true;
  }
}
