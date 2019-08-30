import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

id: number;
username: string;
password: string;

/*
constructor()
{

}

 constructor(username: string, password: string) {
  this.id=-1;
  this.username=username;
  this.password=password;
  }
  */
  constructor( username: string, password?: string,id?: number) {

  this.username=username;
  if (id)
  {
  this.id=id;
  }
  else
  {
    this.id=-1;
  }

  if (password)
  {
  this.password=password;
  }
  else
  {
    this.password=null;
  }
  
  
  }

  ngOnInit() {
  }

}
