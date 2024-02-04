import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router'
import { Observable } from 'rxjs';
import { GroceriesService } from '../services/groceries.service';
import { NgToastService } from 'ng-angular-popup';
import { UserService } from '../services/user.service';
@Injectable({
 providedIn: 'root'
})
export class RoutegaurdGuard implements CanActivate {
  constructor(public rtr :Router,private auth:GroceriesService,private toast:NgToastService,private user:UserService)
  {
    
  }
 canActivate(
   route: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
   
   if(this.user.isLoggedIn())
   {
    return true
   }
   else
   {
    this.toast.error({detail:"ERROR",summary:"Please Login First"})
    this.rtr.navigate(['/login'])
    return false;
   }
     
 return true;
 }

}