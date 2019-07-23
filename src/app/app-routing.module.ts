import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegistrationComponent} from './registration/registration.component'
import {SignInFormComponent} from './sign-in-form/sign-in-form.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyAccountComponent } from './my-account/my-account.component';
import {TransferComponent} from './transfer/transfer.component';
import {AddRecipientComponent} from './add-recipient/add-recipient.component';
const routes: Routes = [
  {path: '',redirectTo: '/login',pathMatch: 'full'},
  {path: 'register',component: RegistrationComponent },
  {path:'login', component: SignInFormComponent},
  {path:'accounts', component: MyAccountComponent},
  {path:'transfer', component: TransferComponent},
  {path:'transfer', component: TransferComponent},
  {path:'addRecipient', component:AddRecipientComponent},

  {path:'**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 