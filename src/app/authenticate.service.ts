import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators';
import { Profile } from 'selenium-webdriver/firefox';
import { Observable } from 'rxjs';


interface TokenResponse 
{
  token: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  returnMessage :any
  token :string
  
  constructor(private http: HttpClient) { }

  //save Function
  saveToken(token :string)
{
localStorage.setItem('usertoken', token)
this.token = token
}

getToken()
{
  return this.token
}
//destroy user token


  //function that authenticate password at login page, username and password are passed in a json object (credential)
  verifyFullCredentials(credentials)
  {
    const base =  this.http.post('http://10.173.200.170:3000/axle/login',credentials)

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


getAccounts(token :string)
{
return this.http.get('http://10.173.200.170:3000/axle/getAccounts',{headers: {Authorization: token} });
}
getRecipients(token :string)
{
return this.http.get('http://10.173.200.170:3000/axle/getRecipients',{headers: {Authorization: token} });
}

transfer( transfer :any, token :any)
{
  var httpHeader=  new HttpHeaders();
  httpHeader.append( 'Authorization', token);
  const base=this.http.post('http://10.173.200.170:3000/axle/transfer',transfer,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}


addRecipient(receiver :any, token :any)
{
  
  var httpHeader=  new HttpHeaders();
  httpHeader.append( 'Authorization', token);
  const base=this.http.post('http://10.173.200.170:3000/axle/addRecipient ',receiver ,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}

freezeAccounts(token :any)
{

  const base=this.http.get('http://10.173.200.170:3000/axle/freezeAccounts',{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}

getTransfers(account :any, token :any)
{

  const base=this.http.post('http://10.173.200.170:3000/axle/getTransfers ',account ,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}

getOneTransfer(transferId :any, token :any)
{

  const base=this.http.post('http://10.173.200.170:3000/axle/getOneTransfer',transferId ,{headers: {Authorization: token} });
  const request = base.pipe(
    map( (data :any)=> {
      return data
    })
  )
  return request
}

}