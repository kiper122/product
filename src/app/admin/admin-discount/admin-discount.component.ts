import { Component, Renderer2, HostListener } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  IDiscountRequest, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interfaces';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import {Storage} from '@angular/fire/storage'


@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent {
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
  public adminCategories !: Array<IDiscountResponse>;
  public editStatus = false;
  private currentCategoryID !:string;
  private deleteCategoryID !:string;
  public isdeleteCategory = false;
  public uploadPercent !: number;
  public isProgressImg = false;
  public isTextFoto = true;
  public isEditFoto = false;
  public isFirstFoto = true;
  constructor(private fb: FormBuilder, private discountService: DiscountService, private storage: Storage) {
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
      description: [null, Validators.required],
      imagePath: [null, this.isEditFoto ? null : Validators.required],
      nameDiscount:[null,Validators.required]
    })
  }
  loadCategories(): void {
    this.discountService.getAllFarebase().subscribe(data => {
      this.adminCategories = data as IDiscountResponse[];
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
      const updateCategory : IDiscountRequest ={
        description:this.categoryForm.get('description')?.value,
        imagePath:this.url,
        nameDiscount:this.categoryForm.get('nameDiscount')?.value
      }
      this.discountService.updateFirebase(updateCategory, this.currentCategoryID).then(() => {
        this.loadCategories()
      })
    }
    else {
      const newCategory : IDiscountRequest = {
        description:this.categoryForm.get('description')?.value,
        imagePath:this.url,
        nameDiscount:this.categoryForm.get('nameDiscount')?.value
      }
      this.discountService.createFirebase(newCategory).then(() => {
        this.loadCategories();
      })
      
    }
    this.resetImageForm();
    this.categoryForm.reset();
    this.editStatus = false;
    this.isFirstFoto = true;
    this.disabledAddImgCategory = false;
  }
  editCategory(category: IDiscountResponse): void {
    this.currentCategoryID = category.id;
    this.editStatus = true;
    this.isTextFoto = false;
    this.isBorderFoto = false;
    this.url = category.imagePath;
    this.isEditFoto = true;
    this.initCategoryForm();
    this.categoryForm.patchValue({
      description:category.description,
      nameDiscount:category.nameDiscount
    });
    this.disabledAddImgCategory = true;
  }
  upload(event: any): void {
    this.disabledAddImgCategory = true;
    const file = event.target.files[0];
    this.uploadFile('discounts', file.name, file)
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
  //uploadFile(img) in firebase
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
        // console.log(this.url);
      } catch (e: any) {
        console.log(e);
      }
    }
    else {
      console.log('wrong format');
    }
    return Promise.resolve(this.url);
  }
  //delete img fron firebase
  deleteIIIMM(urlImg?:string): void {
    let deleteUrlImg = urlImg? urlImg : this.url;
    const task = ref(this.storage, deleteUrlImg);
    deleteObject(task).then(() => {
      console.log('File deletet');
      this.uploadPercent = 0;
      this.resetImageForm();
      this.closeGlobalAllert();
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
    this.discountService.deleteFirebase(this.deleteCategoryID).then(() => {
      this.loadCategories();
    })
    this.isdeleteCategory = false;
    this.isGlobalAllert = false;
    this.isFirstFoto = true;
  }
  clickDeleteCategory(category: IDiscountResponse): void {
    this.deleteImgUrl = category.imagePath;
    this.isGlobalAllert = true;
    this.deleteCategoryID = category.id;
    this.isdeleteCategory = true;
  }
}
