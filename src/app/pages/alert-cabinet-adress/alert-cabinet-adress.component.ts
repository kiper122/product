import { Component } from '@angular/core';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertSaveComponent } from '../alert-save/alert-save.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-cabinet-adress',
  templateUrl: './alert-cabinet-adress.component.html',
  styleUrls: ['./alert-cabinet-adress.component.scss']
})
export class AlertCabinetAdressComponent {
  public adressFormGroup !: FormGroup;

  constructor(private fb: FormBuilder, private afs: Firestore,private dialog:MatDialog) { }
  ngOnInit(): void {
    this.initAdressFormGroup();
    this.initUsers();
  }
  initAdressFormGroup(): void {
    this.adressFormGroup = this.fb.group({
      Citi: [null, Validators.required],
      Street: [null, Validators.required],
      numbersHome: [null, Validators.required],
      Entrance: [null],
      Floot: [null],
      Entryphone: [null],
      kv: [null]
    })
  }
  initUsers(): void {
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        if (user) {
          this.adressFormGroup = this.fb.group({
            Citi: [user['Citi'], Validators.required],
            Street: [user['Street'], Validators.required],
            numbersHome: [user['numbersHome'], Validators.required],
            Entrance: [user['Entrance']],
            Floot: [user['Floot']],
            Entryphone: [user['Entryphone']],
            kv: [user['kv']]
          })
        }
      })
    }
  }

  openDialog():void{
    this.dialog.open(AlertSaveComponent,{
      backdropClass:'backSaveAllert',
      panelClass:'frontSaveAllert'
    })
  }
  cheangeAdress(): void {
    const newAdress = {
      Citi: this.adressFormGroup.get('Citi')?.value,
      Street: this.adressFormGroup.get('Street')?.value,
      numbersHome: this.adressFormGroup.get('numbersHome')?.value,
      Entrance: this.adressFormGroup.get('Entrance')?.value,
      Floot: this.adressFormGroup.get('Floot')?.value,
      Entryphone: this.adressFormGroup.get('Entryphone')?.value,
      kv: this.adressFormGroup.get('kv')?.value
    }
    const userLocal = localStorage.getItem('currentUser');
    if (userLocal !== null) {
      const parsedObject = JSON.parse(userLocal);
      const uid = parsedObject['uid'];
      this.updateUserData(uid, newAdress);

      docData(doc(this.afs, 'users', uid)).subscribe(user => {
        const currentUser = { ...user, uid: uid };
        localStorage.setItem('currentUser', JSON.stringify(currentUser)
        )
      })
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

}
