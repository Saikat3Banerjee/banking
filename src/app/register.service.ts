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

 
   //save Function
   saveToken(token :string)
   {
   localStorage.setItem('usertoken', token)
   this.token = token
   }

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

  verifyFullCredentials(credentials)
  {
    const base =  this.http.post('http://10.173.200.170:3000/axle/verifyUser',credentials)

    const request = base.pipe(
      map((data :any)=> 
    {
      if (data.token)
      {
        this.saveToken(data.token)
      }
      return data
    })
    )
    return request
  }

  getUser(token :string)
  {
    let test={test:"test"};
    return this.http.post('http://10.173.200.170:3000/axle/getUser',test,{headers: {Authorization: token} })
  }

  getAccounts(token :string)
  {
    let test={test:"test"};
    return this.http.post('http://10.173.200.170:3000/axle/customerSupportGetAccounts',test,{headers: {Authorization: token} });
  }

  unFreezeAccounts(token :any)
{
  let test={test:"test"};

  const base=this.http.post('http://10.173.200.170:3000/axle/unFreezeAccounts',test,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}

createAccount(type,token)
{
  let  accountType={type:type};
  const base=this.http.post('http://10.173.200.170:3000/axle/addAccount',accountType,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}
deleteAccount(account,token)
{
 
  const base=this.http.post('http://10.173.200.170:3000/axle/deleteAccount',account,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}
}

