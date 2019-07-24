import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule} from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInFormComponent } from './sign-in-form/sign-in-form.component';
import { UserComponent } from './user/user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import{AuthenticateService } from './authenticate.service'
import { MyAccountComponent } from './my-account/my-account.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AccountComponent } from './account/account.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TransferComponent } from './transfer/transfer.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddRecipientComponent } from './add-recipient/add-recipient.component';
import { TransferCompleteComponent } from './transfer-complete/transfer-complete.component';
import { NavbarComponent } from './navbar/navbar.component';





@NgModule({
  declarations: [
    AppComponent,
    SignInFormComponent,
    UserComponent,
    MyAccountComponent,
    RegistrationComponent,
    PageNotFoundComponent,
    AccountComponent,
    TransferComponent,
    AddRecipientComponent,
    TransferCompleteComponent,
    NavbarComponent,
   
 
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatRadioModule,
    MatAutocompleteModule,
    MatExpansionModule,

  ],
  providers: [HttpClientModule,AuthenticateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
