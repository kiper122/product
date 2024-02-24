import { Component, Renderer2, HostListener } from '@angular/core';
import { deleteObject, getDownloadURL, percentage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';
import {Storage} from '@angular/fire/storage'
import { PaymentService } from 'src/app/shared/services/paymant/payment.service';
import { IPaymentRequest, IPaymentResponse } from 'src/app/shared/interfaces/payment/payment.interface';

@Component({
  selector: 'app-admin-payment',
  templateUrl: './admin-payment.component.html',
  styleUrls: ['./admin-payment.component.scss']
})
export class AdminPaymentComponent {
  public w !: number;
  public h !: number;
  public disabledAddImgpayment = false;
  public paymentForm !: FormGroup;
  public url = '';
  public deleteImgUrl = '';
  public isBorderFoto = true;
  public isGlobalAllert = false;
  public isInfoImage = false;
  public isDeleteImage = false;
  public adminCategories !: Array<IPaymentResponse>;
  public editStatus = false;
  private currentpaymentID !:string;
  private deletepaymentID !:string;
  public isdeletepayment = false;
  public uploadPercent !: number;
  public isProgressImg = false;
  public isTextFoto = true;
  public isEditFoto = false;
  public isFirstFoto = true;

  constructor(private fb: FormBuilder, private discountService: PaymentService, private storage: Storage) {
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
    this.initpaymentForm();
    this.loadCategories();
  }
  initpaymentForm(): void {
    this.paymentForm = this.fb.group({
      description: [null, Validators.required],
      imagePath: [null, this.isEditFoto ? null : Validators.required],
      nameIPayment:[null,Validators.required]
    })
  }
  loadCategories(): void {
    this.discountService.getAllFarebase().subscribe(data => {
      this.adminCategories = data as IPaymentResponse[];
    });
  }
  clickInfoFoto(): void {
    this.isInfoImage = true;
    this.isGlobalAllert = true;
    this.isDeleteImage = false;
  }
  closeGlobalAllert(): void {
    this.isInfoImage = false;
    this.isdeletepayment = false;
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
    this.paymentForm.patchValue({
      imagePath: null
    })
  }

  addpayment(): void {
    if (this.editStatus) {
      const updatepayment : IPaymentRequest ={
        description:this.paymentForm.get('description')?.value,
        imagePath:this.url,
        nameIPayment:this.paymentForm.get('nameIPayment')?.value
      }
      this.discountService.updateFirebase(updatepayment, this.currentpaymentID).then(() => {
        this.loadCategories()
      })
    }
    else {
      const newpayment : IPaymentRequest = {
        description:this.paymentForm.get('description')?.value,
        imagePath:this.url,
        nameIPayment:this.paymentForm.get('nameIPayment')?.value
      }
      this.discountService.createFirebase(newpayment).then(() => {
        this.loadCategories();
      })
      
    }
    this.resetImageForm();

    this.paymentForm.reset();
    this.editStatus = false;
    this.isFirstFoto = true;
    this.disabledAddImgpayment = false;
  }
  editpayment(payment: IPaymentResponse): void {
    this.currentpaymentID = payment.id;
    this.editStatus = true;
    this.isTextFoto = false;
    this.isBorderFoto = false;
    this.url = payment.imagePath;
    this.isEditFoto = true;
    this.initpaymentForm();
    this.paymentForm.patchValue({
      description:payment.description,
      nameIPayment:payment.nameIPayment
    });
    this.disabledAddImgpayment = true;
  }

 

  upload(event: any): void {
    this.disabledAddImgpayment = true;
    const file = event.target.files[0];
    this.uploadFile('payment', file.name, file)
      .then(data => {
        this.paymentForm.patchValue({
          imahePath: data
        });
        this.isFirstFoto = false;
      })
      .catch(err => {
        console.log(err);
      })

      this.isFirstFoto = false;
      this.disabledAddImgpayment = true;
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
      this.paymentForm.patchValue({
        imagePath: null
      });
    })
      .catch(err => {
        console.log(err);
      })
      this.isFirstFoto = true;
      this.disabledAddImgpayment = false;
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
//deletepayment final
  deletepayment(): void {
    this.deleteIIIMM(this.deleteImgUrl);
    this.discountService.deleteFirebase(this.deletepaymentID).then(() => {
      this.loadCategories();
    })
    this.isdeletepayment = false;
    this.isGlobalAllert = false;
    this.isFirstFoto = true;
  }
  clickDeletepayment(payment: IPaymentResponse): void {
    this.deleteImgUrl = payment.imagePath;
    this.isGlobalAllert = true;
    this.deletepaymentID = payment.id;
    this.isdeletepayment = true;
  }

}
