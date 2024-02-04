import { Component } from '@angular/core';
import { Groceries } from './models/groceries';

import { GroceriesService } from './services/groceries.service';
import { UserStoreService } from './services/user-store.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Groceries.UI';
  data:Groceries[] = [];
  dataToEdit?:Groceries;
  public fullName:string="";
  menuType:String='default';
  public role!:string
  public userid!:number
  constructor(private groceriesService:GroceriesService,private userstore:UserStoreService,private route:Router,private user:UserService)
  {

  }
  ngOnInit():void{
    
    this.groceriesService
    .getGroceries()
    .subscribe((result:Groceries[])=>(this.data=result));
    this.route.events.subscribe((val:any) =>
    {
      // console.warn(val.url);
      if(localStorage.getItem('token') )
      {
        // console.warn("this is inside")
        this.menuType="logged"
        
      }
      else{
        // console.warn("outside");
        this.menuType="default"
      }
      
    })
    
    this.userstore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken=this.user.getRoleFromToken();
      this.role =val || roleFromToken;

    })

    this.userstore.getIdFromStore()
    .subscribe((val) =>{
      const IdFromToken =this.user.getIdFromToken();
      this.userid=val || IdFromToken; 
     
    })

    this.userstore.getFullNameFromStore().subscribe(val =>{
      // let FullNameFromToken=this.groceriesService.getFullNameFromToken();
      // this.fullName = val || FullNameFromToken
      const fullNameFromToken = this.user.getFullNameFromToken();
    this.fullName = val || fullNameFromToken;

    // Update the full name in the store if it is not already set
    if (!val && fullNameFromToken) {
      this.userstore.setFullNameForStore(fullNameFromToken);
    }

    });
  }

  logout()
  {
    this.user.signOut();

  }

  // updateGroceriesList(data:Groceries[])
  // {
  //   this.data=data;
  // }

 
  


}
