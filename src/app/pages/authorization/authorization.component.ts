import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Auth, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ROLE } from 'src/app/shared/constants/role.constants';
import { AcountService } from 'src/app/shared/services/acount/acount.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit, OnDestroy {
  public authForm!: FormGroup;
  public loginSubscription!: Subscription;
  public w !:number;
  public h !:number;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private accountService: AcountService,
    private auth: Auth,
    private afs: Firestore,
    private toastr: ToastrService
  ) { 
    if (typeof window !== 'undefined') {
      this.w = window.innerWidth;
      this.h = window.innerHeight;
    }
  }


@HostListener('window:resize', ['$event'])
onResize(event: Event): void {
  // Проверяем наличие window перед его использованием
  if (typeof window !== 'undefined') {
    this.h = window.innerHeight;
    this.w = window.innerWidth;
  }
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
  ngOnDestroy(): void {
    this.loginSubscription.unsubscribe();
  }


  loginUser(): any {
    const { email, password } = this.authForm.value;
    this.authForm.reset();
    this.login(email, password).then(() => {
      this.toastr.success("User successfully login");
    })
      .catch(e => {
        console.log(e);
      })
  }


  async login(email: string, password: string): Promise<any> {
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    console.log(credential.user.uid);
    this.loginSubscription = docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      this.accountService.isUserLogin$.next(true);
      if (user && user['role'] === ROLE.USER) {
        this.route.navigate(['/cabinet']);
      }
      if (user && user['role'] === ROLE.ADMIN) {
        this.route.navigate(['/admin']);
      }

    }, (error) => {
      console.log('error', error);
    })
  }


}
