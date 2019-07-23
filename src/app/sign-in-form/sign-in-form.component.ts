import { Component, OnInit ,Input} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {UserComponent} from '../user/user.component';
import { HttpClient } from '@angular/common/http'
import { AuthenticateService } from '../authenticate.service';
import {Router} from '@angular/router'



@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
 
})



export class SignInFormComponent implements OnInit
{

logInForm: FormGroup;


 @Input() userList: UserComponent[];
 


 returnMessage:any;
  
constructor(private formBuilder: FormBuilder, private http: HttpClient, private authenticateService: AuthenticateService, private router:Router)
{

}

  ngOnInit()
  {
  this.logInForm=this.formBuilder.group({
    username:[''],
    password: ['']
  });

 this.returnMessage='';
  }

  get f(){return this.logInForm.controls;}// function that returns user inputs (login and password) in login form
 

  
// function called when user click login button, makes api call to the server,
//server returns a string stored in class variable returnMessage 
  logInFormHandler()
 {

  var credentials={username: this.f.username.value, password:this.f.password.value}
  this.authenticateService.verifyFullCredentials(credentials).subscribe( data =>
    {
      this.returnMessage=data.returnMessage;
      if(localStorage.getItem('usertoken')) // check if token was created (meaning succesful login)
      {
      //send to my account page
      this.router.navigate(['/accounts']);
      }

 
    }); 

  }



  

 
  
}

