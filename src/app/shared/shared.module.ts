import {NgModule} from '@angular/core'
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button'
import {MatTableModule} from '@angular/material/table';
const METERIAL =[
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
]
//other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
@NgModule({
    declarations:[],
    imports:[
        ...METERIAL,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
    ],
    exports:[
        ...METERIAL,
      ReactiveFormsModule,
      FormsModule,
      HttpClientModule
    ]
})
export class SharedModule{}
