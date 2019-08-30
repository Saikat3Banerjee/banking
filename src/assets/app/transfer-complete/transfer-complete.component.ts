import { Component, OnInit,Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticateService } from '../authenticate.service';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-transfer-complete',
  templateUrl: './transfer-complete.component.html',
  styleUrls: ['./transfer-complete.component.css']
})
export class TransferCompleteComponent implements OnInit {

  @Input() TransferInput ?:any;
  @Input() TransferId ?:any;

  Transfer :any;
  returnMessage ?:string;
  constructor(private http: HttpClient, private route: ActivatedRoute ,private authenticateService: AuthenticateService, private router:Router) { }

  ngOnInit() {


 this.route.queryParams.subscribe(params => { 
   if(params['TransferInput'])
   {
    this.TransferInput= params['TransferInput'];

   }
   else
   {
    this.TransferId= params['TransferId'];

   }
  });


  if (this.TransferInput)
  {
    this.Transfer=JSON.parse(this.TransferInput);
    
    
  }
  else if (this.TransferId)
  {
    var transferId={transferId:this.TransferId}
    this.authenticateService.getOneTransfer(transferId,localStorage.getItem('usertoken')).subscribe((data)=> 
  {
    if (data.transfer)
    {

      this.Transfer={sender_account_number:data.transfer.sender_account_num,recipient_account_number:data.transfer.recipient_account_num,amount:data.transfer.amount,note:data.transfer.note};
    }
    else
    {
      this.returnMessage=data.returnMessage;
    }
    
  })
}
else
{
this.returnMessage="Error displaying Transaction";
}

    }




    setUpTransferDisplay()
    {
      if (this.TransferInput)
      {
        this.Transfer=this.TransferInput;
        console.log(this.Transfer.amount);
        
      }
      else if (this.TransferId)
      {
        var transferId={transferId:this.TransferId}
        this.authenticateService.getOneTransfer(transferId,localStorage.getItem('usertoken')).subscribe((data)=> 
      {
        if (data.transfer)
        {
          this.Transfer=data.transfer;
        }
        else
        {
          this.returnMessage=data.returnMessage;
        }
        
      })
    }
    else
    {
  this.returnMessage="Error displaying Transaction";
    }
    }
  }


