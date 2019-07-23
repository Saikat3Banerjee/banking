import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

 
  returnMessage :any
  token :string
  
  constructor(private http: HttpClient) { }

 
 
  registerUser(newUserData)
  {
    const base =  this.http.post('http://10.173.200.170:3000/axle/register',newUserData)

    const request = base.pipe(
      map((data :any)=> 
    {
            return( data.returnMessage)
    })
    )
    return request
  }
}
