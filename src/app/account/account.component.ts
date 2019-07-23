import { Component, OnInit ,Input} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthenticateService } from '../authenticate.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  type :string// account type ( checking or saving or other)
  @Input() Account :any;

  constructor() { 
    
  }

  ngOnInit()
   {
    if (this.Account)
    {
      //1 for checking and 0 for saving
      
     var typeNum=this.Account.account_number.toString()[11];
     
     switch (typeNum)
     {
      case "1":
        this.type="Checking Account";
        break;
      case "0":
        this.type="Saving Account";
        break;
      default:
        this.type="Other";


     }
        
     
    }
  }

}
