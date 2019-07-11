import { Component } from '@angular/core';
import {SignInFormComponent} from './sign-in-form/sign-in-form.component'
import {UserComponent} from './user/user.component'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent
{
 users: UserComponent[]=[
  /* { id: 0,
  username: 'axle',
  password: 'axle'},
 {  id: 1,
  username: 'axle2',
  password: 'axle2'}*/
  ];
  title = 'Axle-Banking';


  addNewUser($event)
  {

    console.log($event);
    var userToAdd=$event;
    if(this.users.length>0)
    {
    var newId=this.users[this.users.length-1].id +1;
    }
    else
    {
      newId=0;
    }
    userToAdd.id=newId;
    this.users.push(userToAdd);
    console.log(userToAdd);
  }
}
