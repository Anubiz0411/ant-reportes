import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
 
import { environment } from '../environments/environment';

//AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

//Forms
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms'; 

//Material design
import { 
  MatTableModule, 
  MatInputModule, 
  MatButtonModule, 
  MatSortModule, 
  MatFormFieldModule, 
  MatIconModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatGridListModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatSidenavModule
} from '@angular/material';
//Components
import { LoginComponent } from './components/login/login.component';
import { IndexComponent } from './components/index/index.component';
import { ShowComponent } from './components/show/show.component';
import { MatTableExporterModule } from 'mat-table-exporter';

 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    ShowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule, MatInputModule, MatButtonModule, MatSortModule, MatFormFieldModule, MatCardModule, MatProgressSpinnerModule,MatSelectModule,MatGridListModule,MatCheckboxModule,
    MatTableExporterModule,MatToolbarModule, MatSidenavModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    ReactiveFormsModule, BrowserAnimationsModule,
  ],
  exports: [
    MatFormFieldModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatGridListModule,
    MatCheckboxModule,
    MatTableExporterModule,
  ],
  providers: [
    AngularFireAuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
