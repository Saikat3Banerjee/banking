import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from '../app.component';
import {UserComponent} from '../user/user.component';
import { HttpClient } from '@angular/common/http'
import {RegisterService } from '../register.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;


  

   returnMessage:any;
    
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private registerService: RegisterService)
  {
  
  }

  ngOnInit() {
    this.registerForm=this.formBuilder.group({

      username:[''],
      password: [''],
      SSN_TIN: [''],
      email:['']
  })};
  get f(){return this.registerForm.controls;}// function that returns user inputs (login and password) in register form

  registerFormHandler(e)
  {
 
   var newUserData={username: this.f.username.value, password:this.f.password.value,SSN_TIN:this.f.SSN_TIN.value,email:this.f.email.value}
   this.registerService.registerUser(newUserData).subscribe(
     data=> {
       this.returnMessage=data;
     }
   ); 
  
 
  }
}
