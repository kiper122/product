import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthDialogComponent } from 'src/app/components/auth-dialog/auth-dialog.component';

@Component({
  selector: 'app-alert-save',
  templateUrl: './alert-save.component.html',
  styleUrls: ['./alert-save.component.scss']
})
export class AlertSaveComponent {
  constructor(    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private auth: Auth,
    private afs: Firestore,
    private route: Router){}
}
