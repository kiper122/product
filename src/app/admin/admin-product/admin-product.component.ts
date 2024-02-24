import { Component, Renderer2, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponce } from 'src/app/shared/interfaces/category/category.interfaces';
import { IProductRequest, IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { Storage, deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage'




@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent {
  public w !: number;
  public h !: number;
  public categories !: ICategoryResponce[];
  public productForm !: FormGroup;
  public editStatus = false;
  private currentCategoryId = 0;
  private currentProductId = '';
  public isEditFoto = false;
  public isChangeSelect = false;
  public isFirstFoto = true;
  public disabledAddImgProduct = false;
  public isProgressImg = false;
  public uploadPercent !: number;
  public url = '';
  public isTextFoto = true;
  public isBorderFoto = true;
  public isGlobalAllert = false;
  public isInfoImage = false;
  public isDeleteImage = false;
  public isdeleteProduct = false;
  public deleteImgUrl = '';
  public isDisableTableButton = false;

  public disabledAddImgCategory = false;

  public deleteProductID = '';

  public productTableActiuve = true;
  public isProductInfoPanel  = false;
  public adminCategories: Array<ICategoryResponce> = [];
  public adminProduct !: Array<IProductResponse> ;
  public productDetalisElement !:  IProductResponse;
  constructor(
    private renderer: Renderer2,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private productService: ProductService,
    private storage: Storage
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
    this.loadCategories();
    this.loadProduct();
    this.initProductForm();
  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      discount:[null],
      category: [this.currentCategoryId, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null],
      price: [null, Validators.required],
      size: [null],
      imagePath: [null, this.isEditFoto ? null : Validators.required],
      proteins: [null],
      carbohydrates: [null],
      fat: [null],
      calories: [null],
      count: [1],
      
    })
  }
  loadCategories(): void {
    this.categoryService.getAllFarebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponce[];
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    });
  }
  loadProduct(): void {
    this.productService.getAllFirebase().subscribe(data => this.adminProduct = data as IProductResponse[]);
  }
  addProduct(): void {
    if (this.editStatus) {
      const updateProducte : IProductRequest = {
        discount:this.productForm.get('discount')?.value,
        name:this.productForm.get('name')?.value,
        path:this.productForm.get('path')?.value,
        imagePath:this.url,
        category: this.productForm.get('category')?.value,
        description: this.productForm.get('description')?.value,
        weight: this.productForm.get('weight')?.value,
        price: this.productForm.get('price')?.value,
        size: this.productForm.get('size')?.value,
        proteins: this.productForm.get('proteins')?.value,
        carbohydrates: this.productForm.get('carbohydrates')?.value,
        fat: this.productForm.get('fat')?.value,
        calories: this.productForm.get('calories')?.value,
        count:1,
      }
      this.isFirstFoto = true;
      this.resetImageForm();
      this.productForm.reset();
      this.productService.updateFirebase(updateProducte, this.currentProductId).then(() => {
        this.loadCategories();
      this.disabledAddImgCategory = false;
      })
    }
    else {
      const newProduct: IProductRequest = {
        discount:this.productForm.get('discount')?.value,
        category: this.productForm.get('category')?.value,
        name: this.productForm.get('name')?.value,
        path: this.productForm.get('path')?.value,
        description: this.productForm.get('description')?.value,
        weight: this.productForm.get('weight')?.value,
        price: this.productForm.get('price')?.value,
        size: this.productForm.get('size')?.value,
        imagePath: this.url,
        proteins: this.productForm.get('proteins')?.value,
        carbohydrates: this.productForm.get('carbohydrates')?.value,
        fat: this.productForm.get('fat')?.value,
        calories: this.productForm.get('calories')?.value,
        count:1,
      }
      this.isFirstFoto = true;
      this.resetImageForm();
      this.productForm.reset();
      this.disabledAddImgCategory = false;
      this.productService.createFirebase(newProduct).then(() => {
        this.loadProduct();
      })
      
    }
    this.disabledAddImgCategory = false;
    this.editStatus = false;
    this.productTableActiuve = true;
    this.isProductInfoPanel = false;
    this.isDisableTableButton = false;

  }
  editProduct(product: IProductResponse) { 
    this.isDisableTableButton = true;

    this.isProductInfoPanel = false;
    this.isFirstFoto = false;
    this.currentProductId = product.id;
    this.editStatus = true;
    this.isTextFoto = false;
    this.isBorderFoto = false;
    this.url = product.imagePath;
    this.isEditFoto = true;
    this.initProductForm();
    this.productForm.patchValue({
      discount:product.discount,      
      name:product.name,
      path:product.path,
      category: product.category,
      description:product.description,
      weight:product.weight,
      price:product.price,
      size:product.size,
      proteins:product.proteins,
      carbohydrates:product.carbohydrates,
      fat:product.fat,
      calories:product.calories,
      count: [1]
    });
    this.disabledAddImgCategory = true;
    this.productTableActiuve = false;

  }
  deleteProduct(product: IProductResponse) { }
  upload(event: any): void {
    this.disabledAddImgProduct = true;
    const file = event.target.files[0];
    this.uploadFile('products', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          imahePath: data
        });
        this.isFirstFoto = false;
      })
      .catch(err => {
        console.log(err);
      })

    this.isFirstFoto = false;
    this.disabledAddImgProduct = true;
  }
  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    this.disabledAddImgCategory = true;

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
  clickInfoFoto(): void {
    this.isInfoImage = true;
    this.isGlobalAllert = true;
    this.isDeleteImage = false;
  }
  closeGlobalAllert(): void {
    this.isInfoImage = false;
    this.isdeleteProduct = false;
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
    this.productForm.patchValue({
      imagePath: null
    })
  }
  deleteIIIMM(urlImg?:string): void {
    let deleteUrlImg = urlImg? urlImg : this.url;
    const task = ref(this.storage, deleteUrlImg);
    console.log(task);
    deleteObject(task).then(() => {
      console.log('File deletet');
      this.uploadPercent = 0;
      this.resetImageForm();
      this.closeGlobalAllert();
      this.uploadPercent = 0;
      this.disabledAddImgCategory =false;
      this.productForm.patchValue({
        imagePath: null
      });
      
    })
      .catch(err => {
        console.log(err);
      })
      this.isFirstFoto = true;
      this.disabledAddImgProduct = false;
      this.isEditFoto = false;
  }
  deleteCategory(): void {
    this.deleteIIIMM(this.deleteImgUrl);
    this.productService.deleteFirebase(this.deleteProductID).then(() => {
      this.loadProduct();
    })
    this.isdeleteProduct = false;
    this.isGlobalAllert = false;
    this.isFirstFoto = true;
    this.isProductInfoPanel =false;
  }

  clickDeleteCategory(product: IProductResponse): void {
    this.deleteImgUrl = product.imagePath;
    this.isGlobalAllert = true;
    this.deleteProductID = product.id;
    this.isdeleteProduct = true;
  }
  tableActive():void{
    this.productTableActiuve = true;
    this.loadCategories();
    this.initProductForm();
    this.loadProduct();
  }
  formActive():void{
    this.productTableActiuve = false;
    this.isProductInfoPanel = false;
    
  }

  getObjectKeysAndValues(obj: any): { key: string; value: any }[] {
    return Object.keys(obj).map((key) => ({ key, value: obj[key] }));
  }

  productDetalis(product:IProductResponse){
    this.isProductInfoPanel = true;
    this.productService.getOneFirebase(product.id).subscribe(data=>{
      this.productDetalisElement = data as IProductResponse;
    })
  }
  productInfoPanelClouse():void{
    this.isProductInfoPanel = false;

  }



}
