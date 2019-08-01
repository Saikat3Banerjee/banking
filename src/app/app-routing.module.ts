// Bank User Modules

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component'
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MyAccountComponent } from './my-account/my-account.component';
import {TransferComponent} from './transfer/transfer.component';
import {AddRecipientComponent} from './add-recipient/add-recipient.component';
import {TransferCompleteComponent} from './transfer-complete/transfer-complete.component';
import {SupportComponent} from './support/support.component';
import {SettingsComponent} from './settings/settings.component'


//Customer Support Modules 

import {CustomSupportMenuComponent} from './custom-support-menu/custom-support-menu.component'
import {RegistrationComponent} from './registration/registration.component'
import { GridTableComponent } from './grid-table/grid-table.component';


const routes: Routes = [
  {path: '',redirectTo: '/login',pathMatch: 'full'},
  
  {path:'login', component: SignInFormComponent},
  {path:'accounts', component: MyAccountComponent},
  {path:'transfer', component: TransferComponent},
  {path:'transfer', component: TransferComponent},
  {path:'addRecipient', component:AddRecipientComponent},
  {path: 'transferComplete',component:TransferCompleteComponent},
  {path: 'support',component:SupportComponent},
  {path: 'settings',component:SettingsComponent},

  // CUstomer Support Routes 
  {path: 'customerSupport', component:CustomSupportMenuComponent},
  {path: 'register',component: RegistrationComponent },
  {path: 'gridTable', component: GridTableComponent},
  //Wild Card
  {path:'**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

 