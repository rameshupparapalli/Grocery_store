import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userPayLoad:any;
  constructor(private rtr:Router) {
    this.userPayLoad=this.decodedToken();
   }

  storeToken(tokenvalue:string)
  {
   localStorage.setItem('token',tokenvalue)
   this.userPayLoad = this.decodedToken();
  }

  getToken()
  {
   return localStorage.getItem('token')
  }

  isLoggedIn():boolean
  {
   return !! localStorage.getItem('token')
  }
  signOut()
  {
   localStorage.clear();
   this.userPayLoad = null;
   this.rtr.navigate(['login'])

  }

  decodedToken()
  {
  
  const jwtHelper = new JwtHelperService();
    const token = this.getToken();
    if (token) {
      console.log(jwtHelper.decodeToken(token));
      return jwtHelper.decodeToken(token);
    }
    return null;
  }
  
  getFullNameFromToken()
  {
    
    if (this.userPayLoad) {
      return this.userPayLoad.unique_name;
    }
    return null;
  }
  getRoleFromToken()
  {

  if (this.userPayLoad) {
    return this.userPayLoad.role;
  }
  return null;

  }
  getIdFromToken()
  { 
  
  if (this.userPayLoad) {
    return this.userPayLoad.nameid;
  }
  return null;
  }

}
