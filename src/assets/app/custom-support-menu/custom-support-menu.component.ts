import { Component, OnInit ,Input} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {UserComponent} from '../user/user.component';
import { HttpClient } from '@angular/common/http'
import { RegisterService } from '../register.service';
import { AuthenticateService } from '../authenticate.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-custom-support-menu',
  templateUrl: './custom-support-menu.component.html',
  styleUrls: ['./custom-support-menu.component.css']
})
export class CustomSupportMenuComponent implements OnInit {

  User :any;
  AccountList :any;
  SavingAccounts ?:any;
  CheckingAccounts ?:any;
  AccountsStatus :string;

  returnMessage :any;
  UserFinder :boolean;


  deleteAccountForm :FormGroup;
  logInForm :FormGroup;

 token :any;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private registerService: RegisterService, private authenticateService: AuthenticateService, private router:Router) { }

  ngOnInit()
  {
 this.logInForm=this.formBuilder.group({
    username:[''],
    email:['']
  });
  this.deleteAccountForm=this.formBuilder.group({
    account_number:['']
  });
  this.UserFinder=true;
 this.token=localStorage.getItem('usertoken');

 this.returnMessage='';
 window.localStorage.removeItem('usertoken');
  }


  get f(){return this.logInForm.controls;}// function that returns user inputs (login and password) in login form
  get g(){return this.deleteAccountForm.controls;}
  logInFormHandler()
 {

  var credentials={username: this.f.username.value, email:this.f.email.value}
  this.registerService.verifyFullCredentials(credentials).subscribe( data =>
    {
      
      this.returnMessage=data.returnMessage;

      if(localStorage.getItem('usertoken')) // check if token was created (meaning succesful login)
      {
        this.token=  localStorage.getItem('usertoken');
        this.getUser(localStorage.getItem('usertoken'));
      }

 
    }); 

  }
  deleteAccountFormHandler()
  {
    var account={account_number:this.g.account_number.value};
    this.registerService.deleteAccount(account,localStorage.getItem('usertoken')).subscribe (data =>
      {
        console.log(data);
        this.getUser(localStorage.getItem('usertoken'));
        this.returnMessage=data.returnMessage;
      })
  }

  getUser(token)
  {
    
    this.registerService.getUser(localStorage.getItem('usertoken')).subscribe( data =>
      {
        this.User=data;
        this.displayAccounts(localStorage.getItem('usertoken'));
      });
  }
  displayAccounts(token)
  {
    this.registerService.getAccounts(token).subscribe( data =>
      {
        this.AccountList=data;
        if(this.AccountList[0].active == false)
        {
          this.AccountsStatus="Frozen";
        }
        else
        {
          this.AccountsStatus="Active";
        }
        this.SavingAccounts=this.AccountList.filter((account)=>{
          
          if (account.account_type=="Saving")
          {
             return account;
          }          
        });

        this.CheckingAccounts=this.AccountList.filter((account)=>{
          
          if (account.account_type=="Checking")
          {
             return account;
          }          
        });
        
        });
     
  }


  UnFreezeAccounts()
  {
    this.registerService.unFreezeAccounts(localStorage.getItem('usertoken')).subscribe((data)=> 
    {
      this.getUser(localStorage.getItem('usertoken'));
      this.returnMessage=data.returnMessage;
    })
  }

  freezeAccounts()
  {
    this.authenticateService.freezeAccounts(localStorage.getItem('usertoken')).subscribe((data)=> 
    {
      this.getUser(localStorage.getItem('usertoken'));
      this.returnMessage=data.returnMessage;
    })
  }

  createAccount(type)
  {
    this.registerService.createAccount(type,localStorage.getItem('usertoken')).subscribe((data)=> 
    {
      this.getUser(localStorage.getItem('usertoken'));
      this.returnMessage=data.returnMessage;
    })
  }

  changeUserFinder()
  {
    if (this.UserFinder)
    {
      this.UserFinder=false;
    }
    else
  {
    this.UserFinder=true;
  }
  }
}
