import { Component, OnInit ,Input} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {UserComponent} from '../user/user.component';
import { HttpClient } from '@angular/common/http'
import { AuthenticateService } from '../authenticate.service';
import {Router} from '@angular/router'


@Component({
  selector: 'app-add-recipient',
  templateUrl: './add-recipient.component.html',
  styleUrls: ['./add-recipient.component.css']
})
export class AddRecipientComponent implements OnInit {

  addRecipientForm: FormGroup;
  displayAccountNum: boolean;

 @Input() userList: UserComponent[];
 


 returnMessage:any;
  
constructor(private formBuilder: FormBuilder, private http: HttpClient, private authenticateService: AuthenticateService, private router:Router)
{

}

  ngOnInit()
  {
    if(!localStorage.getItem('usertoken'))
    {
      console.log('routing back');
      this.router.navigate(['/login']);
    }
  this.addRecipientForm=this.formBuilder.group({
    recipient_account_number:[''],
    email:[''],
    alias: ['']
  });
  this.displayAccountNum=false;

 this.returnMessage='';
  }

  get f(){return this.addRecipientForm.controls;}// function that returns user inputs (login and password) in login form
 

  
// function called when user click login button, makes api call to the server,
//server returns a string stored in class variable returnMessage 
  addRecipientFormHandler()
 {

  if(localStorage.getItem('usertoken')) // check if token was created (meaning succesful login)
  {
    var receiver={recipient_account_number: this.f.recipient_account_number.value, alias:this.f.alias.value,email:this.f.email.value};
  this.authenticateService.addRecipient(receiver,localStorage.getItem('usertoken')).subscribe( data =>
    {
     
      this.returnMessage=data.returnMessage; 
    }); 

  //send to my account page
  //this.router.navigate(['/transfer']);
  }
  
  }

  changeRecipientFinder()
  {
    if (this.displayAccountNum)
    {
      this.displayAccountNum=false;
    }
    else
  {
    this.displayAccountNum=true;
  }
  }

}
