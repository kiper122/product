import { Component } from '@angular/core';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc,updateDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { AcountService } from 'src/app/shared/services/acount/acount.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-dialog-registration',
  templateUrl: './dialog-registration.component.html',
  styleUrls: ['./dialog-registration.component.scss'],
  animations: [
    trigger('transitionMessages', [
      state('state1', style({ /* стили для состояния 1 */ })),
      state('state2', style({ /* стили для состояния 2 */ })),
      transition('state1 => state2', animate('500ms')),
      /* Ваша конфигурация анимации */
    ])]
})
export class DialogRegistrationComponent {
  public registrForm!: FormGroup;
  public checkPassword = false;
  constructor(private dialog:MatDialog,private fb:FormBuilder,
    private auth: Auth,
    private afs: Firestore,
    private route: Router,
    private accountService: AcountService,
    private dialogRef: MatDialogRef<DialogRegistrationComponent>,
    ){  }
  openDialog(): void {
    this.dialog.open(AuthDialogComponent, {
      backdropClass:'dialog-back',
      panelClass:'auth-dialog',
      autoFocus:false
    })
  }
  ngOnInit(): void {
    this.initRegistrForm();
    
  }
  initRegistrForm():void{
    this.registrForm =  this.fb.group({
      lastName:['',Validators.required],
      firstName:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
      ConfirmationPassword:['',Validators.required]
    })
  }
  // registerUser():void{}

   registerUser(): void {
    const email =this.registrForm.get('email')?.value;
    const password =this.registrForm.get('password')?.value;
    this.emailSignUp().then(() => {
      this.loginUser(email,password);
    }).catch(e => {
      // this.toastr.error(e);
    });
  }
  async emailSignUp(): Promise<any> {
    const credential = await createUserWithEmailAndPassword(this.auth, this.registrForm.get('email')?.value,  this.registrForm.get('password')?.value);
    const user = {
      Citi:'',
      Entrance:'',
      Entryphone:'',
      Floot:'',
      Street:'',
      address:'',
      email:credential.user.email,
      firstName: this.registrForm.get('firstName')?.value,
      kv:'',
      lastName:this.registrForm.get('lastName')?.value,
      numbersHome:'',
      orders: [],
      phoneNumber: '',
      role: 'USER'
    };
    setDoc(doc(this.afs, 'users', credential.user.uid), user);
    this.registrForm.reset();
  }
  checkConfirmedPassword():void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.registrForm.controls['ConfirmationPassword'].setErrors({
        matchError: 'Password confirmation doesnot match'
      })
    }
  }
  get password(): AbstractControl{
    return this.registrForm.controls['password'];
  }
  get confirmed() : AbstractControl{
    return this.registrForm.controls['ConfirmationPassword']
  }
  checkVisibilityError(control:string,name:string):boolean| null{
    return this.registrForm.controls[control].errors?.[name];
  }

  loginUser(email:string,password:string): void {

    this.login(email, password).then(() => {
      this.dialogRef.close()
    })
      .catch(e => {
        console.log(e)
      })
  }


  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      this.accountService.isUserLogin$.next(true);
      if (user && user['role'] === ROLE.USER) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.route.navigate(['/cabinet']);
      }
    }, (error) => {
      console.log(error);
    })
  }
}

