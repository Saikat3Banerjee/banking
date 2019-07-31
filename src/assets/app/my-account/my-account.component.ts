import { Component, OnInit ,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from '../authenticate.service';
import {Router,NavigationExtras} from '@angular/router'
import { map } from 'rxjs/operators'
import { TransferComponent } from '../transfer/transfer.component';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})


export class MyAccountComponent implements OnInit {

  AccountList ?:any;
  SavingAccounts ?:any;
  CheckingAccounts ?:any;
  returnMessage ?:any;
  Transfers ?:any;
  TransferAccount ?:any;

  constructor(private http: HttpClient, private authenticateService: AuthenticateService, private router:Router) { }

  ngOnInit()
  {
    if(localStorage.getItem('usertoken')) // check if token was created (meaning succesful login
    {
     
      this.authenticateService.getAccounts(localStorage.getItem('usertoken')).subscribe( (data)=>{
        
        this.AccountList=data;
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
    else
    {
      this.router.navigate(['/login']);
    }

  
  }

  freezeAccounts()
  {
    this.authenticateService.freezeAccounts(localStorage.getItem('usertoken')).subscribe((data)=> 
    {
      this.returnMessage=data.returnMessage;
    })
  }

  getTransfers(account)
  {
    account={account_number:account.account_number,balance:account.balance};
    this.authenticateService.getTransfers(account,localStorage.getItem('usertoken')).subscribe((data)=> 
    {
      
      this.Transfers=data.Transfers;
      this.TransferAccount=data.TransferAccount;
      
    })
  }
  getTransactionDetails(transfer)
  {
    var navigationExtras: NavigationExtras = {
      queryParams: {
          "TransferId":JSON.stringify(transfer.transfer_id)
      }
  };
   this.router.navigate(['/transferComplete'],navigationExtras);
  }
}