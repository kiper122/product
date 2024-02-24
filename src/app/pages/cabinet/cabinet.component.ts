import { Component, HostListener } from '@angular/core';
import { Firestore, doc, docData, setDoc, updateDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AcountService } from 'src/app/shared/services/acount/acount.service';
import { AlertSaveComponent } from '../alert-save/alert-save.component';
import { AlertExitComponent } from '../alert-exit/alert-exit.component';
import { AlertCabinetAdressComponent } from '../alert-cabinet-adress/alert-cabinet-adress.component';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { Auth, EmailAuthProvider, signInWithEmailAndPassword ,updatePassword,User} from '@angular/fire/auth';
import { ROLE } from 'src/app/shared/constants/role.constants';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {
  public w !: number;
  public h !: number;
  public cabinetForm!: FormGroup;
  public isValueUser = true;
  public isChangePassword = false;
  public isHistoryOrdrers = false;
  public productsUser !: IProductResponse[];
  public passwordForm !: FormGroup;

  constructor(private router: Router, private accountService: AcountService, private fb: FormBuilder, private afs: Firestore,
    private auth: Auth,
    private dialog:MatDialog
    ) {
    if (typeof window !== 'undefined') {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    }
  }



  @HostListener('window:resize', ['$event'])
  onResize({ event }: { event: Event; }): void {
    if (typeof window !== 'undefined') {
      this.h = window.innerHeight;
      this.w = window.innerWidth;
    }
  }
  ngOnInit(): void {
    this.initCabinetForm();
    this.initUsers();

  }
  initCabinetForm(): void {
    this.cabinetForm = this.fb.group({
      firstName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    })
  }
  logOut(): void {
    this.router.navigate(['']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }
  initFornGroup():void{}
  initUsers(): void {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        if (user) {
          this.cabinetForm = this.fb.group({
            firstName: [user['firstName'], Validators.required],
            phoneNumber: [user['phoneNumber'], Validators.required],
            lastName: [user['lastName'], Validators.required],
            email: [user['email'], [Validators.required, Validators.email]],
          });
          this.productsUser = user['orders'];
        }
      })
    }
  }
  saveNewValueUser():void{
    console.log(this.cabinetForm.value);
    const newDate = {
      firstName: this.cabinetForm.get('firstName')?.value,
      phoneNumber: this.cabinetForm.get('phoneNumber')?.value,
      lastName: this.cabinetForm.get('lastName')?.value,
      email: this.cabinetForm.get('email')?.value
    }
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      this.updateUserData(uid, newDate);

      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        const currentUser = { ...user, uid: uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser)
        )})
    }
  }
  async updateUserData(uid: string, newData: any): Promise<void> {
    const userRef = doc(this.afs, 'users', uid);
    try {
      await setDoc(userRef, newData, { merge: true });
       this.openDialog();
    } catch (error) {
      console.error(error);
    }
  }
  openDialog():void{
    this.dialog.open(AlertSaveComponent,{
      backdropClass:'backSaveAllert',
      panelClass:'frontSaveAllert'
    })
  }
  openDialogExit(enterAnimationDuration: string, exitAnimationDuration: string):void{
    this.dialog.open(AlertExitComponent, {
      width: '300px',
      enterAnimationDuration,
      backdropClass:'backSaveAllert',
      exitAnimationDuration,
    });
  }
  openDialogAdress(){
    this.dialog.open(AlertCabinetAdressComponent, {
      width: '500px',
      height:'480px',
      backdropClass:'backSaveAllert',
      autoFocus:false
    });
  }
  historyOrdrers():void{
    this.isHistoryOrdrers = true;
    this.isValueUser = false;
    this.isChangePassword = false;
    }
  changePassword():void{
    this.passwordForm = this.fb.group({
      password:['',Validators.required],
      newPassword:['',Validators.required],
      twoNewPassword:['',Validators.required]
    })

    this.isHistoryOrdrers = false;
    this.isValueUser = false;
    this.isChangePassword = true;
  }
  valueUser():void{
    this.isHistoryOrdrers = false;
    this.isValueUser = true;
    this.isChangePassword = false;
  }
  submitChengePassword():void{
    this.loginUser();
  }

  loginUser(): void {
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password); 
    //витягуе user
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      this.accountService.isUserLogin$.next(true);
      if (user && user['role'] === ROLE.USER) {
        console.log(122);
        const currentUser = this.auth.currentUser;
        const newPassword = this.passwordForm.get('newPassword')?.value;
        if (currentUser) {
          const credential = updatePassword(currentUser,newPassword);
        }
      }
    }, (error) => {
      console.log(error);
    })
  }
}
