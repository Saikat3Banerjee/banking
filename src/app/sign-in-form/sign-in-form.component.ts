import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {UserComponent} from '../user/user.component';



@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.css'],
 
})



export class SignInFormComponent implements OnInit
{

logInForm: FormGroup;
signUpForm:FormGroup;

 @Input() userList: UserComponent[];
 @Output() addNewUser= new EventEmitter();

  showLogIn:boolean;
 showSignUp:boolean;
 returnMessage:string;
  
constructor(private formBuilder: FormBuilder)
{

}

  ngOnInit()
  {
  this.logInForm=this.formBuilder.group({
    username:[''],
    password: ['']
  });
  this.signUpForm=this.formBuilder.group({
  username:[''],
  password:[''],
  repassword:['']
  });
 this.showLogIn=true;
 this.showSignUp=false;
 this.returnMessage='';
  }

  get f(){return this.logInForm.controls;}
  get g(){return this.signUpForm.controls;}

  logInFormHandler(e)
 {
  var newUsername=this.f.username.value;
  var newPassword=this.f.password.value;

  for ( var i=0; i<this.userList.length;i++)
  {
    if (this.userList[i].username==newUsername && this.userList[i].password==newPassword)
    {
   this.returnMessage='succesful Login '+ newUsername;
   return;
    }
  }
  this.returnMessage='wrong username/password';
  }
  signUpFormHandler(e)
  {

  this.returnMessage='';

  var newUsername=this.g.username.value;
  var newPassword=this.g.password.value;
  var newRePassword=this.g.repassword.value;

 
  if( (newUsername=="") || (newPassword=="") || (newRePassword==""))
  {
  this.returnMessage+='<p>Please complete all the sign up fields </p>';
  }

  for ( var i=0; i<this.userList.length;i++)
  {
    if (this.userList[i].username==newUsername )
    {
   this.returnMessage+='<p>"'+newUsername+'" is already taken, please choose a different username!</p>';
   
    }
  }
  if (newPassword!=newRePassword)
  {
    this.returnMessage+='<p>Passwords entered do not match, please enter matching password </p>';
  }

  if (this.returnMessage=="")
  {

    this.returnMessage="Registration succesful, you can now Log In!!";
    var userToAdd= new UserComponent(newUsername,newPassword);
    this.addNewUser.emit(userToAdd);

  }

  }
  

  switchFormDisplay()
  {
    if(this.showLogIn)
    {
      this.returnMessage='';
      this.showLogIn=false;
      this.showSignUp=true;
      
    }
    else
    {
     if(this.showSignUp)
    {
      this.showLogIn=true;
      this.showSignUp=false;
    }
    }
  }

  
}

