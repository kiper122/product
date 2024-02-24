import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc,updateDoc } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { AcountService } from 'src/app/shared/services/acount/acount.service';
import { DialogRegistrationComponent } from '../dialog-registration/dialog-registration.component';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent {
  public authForm !: FormGroup;
  public isLogin = true;
  toastr: any;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: Auth,
    private afs: Firestore,
    private route: Router,
    private accountService: AcountService,
    private dialog:MatDialog
  ) {
  }
  ngOnInit(): void {
    this.initAuthForm();

  }
  initAuthForm(): void {
    this.authForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    })
  }
  registerButton(): void {
    this.isLogin = !this.isLogin;
  }
  ngOnDestroy(): void {
    // this.loginSubscription.unsubscribe();
  }
  loginUser(): void {
    const { email, password } = this.authForm.value;
    this.authForm.reset();
    this.login(email, password).then(() => {
      this.dialogRef.close();
      this.accountService.isUserLogin$.next(true);
      this.toastr.success("User successfully login");
    })
      .catch(e => {
        console.log(e)
      })
  }
  async login(email: string, password: string): Promise<void> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential.user.uid);
    //витягуе user
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
  openRegistdialog():void{
    this.dialog.open(DialogRegistrationComponent,{
      width:'500px',
      height:'600px',
      backdropClass:'dialog-back',
      autoFocus:false
    })
  }
}
