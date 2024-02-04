import { Injectable } from '@angular/core';
import { Groceries } from '../models/groceries';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Router } from '@angular/router';
import{JwtHelperService}from '@auth0/angular-jwt'
import { CartProducts } from '../models/cartproducts';
import { UserStoreService } from './user-store.service';
import { UserService } from './user.service';
import { orders } from '../models/orders';
import { Comments } from '../models/Comments';



@Injectable({
  providedIn: 'root'
})
export class GroceriesService {
 private  url="Groceries";
 public userid!:number
 private userPayLoad:any;


 private usersurl="http://localhost:65266/api/User/";

  constructor( private http: HttpClient,private rtr:Router,private userStore:UserStoreService,private user:UserService) { 
    this.userPayLoad=this.user.decodedToken();
  }
  ngOnInit() : void{
           
  }
  useridd?:number;
 getid()
  {
    this.userStore.getIdFromStore().subscribe((val) => {
    this.userid = val || this.user.getIdFromToken();
   // console.log(this.userid)
    
     
})}
  
  
   

  getGroceries():Observable<Groceries[]>{
    return this.http.get<Groceries[]>(`${environment.apiUrl}/${this.url}`) ;
  }
  
 createCartProducts(prod:CartProducts):Observable<CartProducts>
 {
  return this.http.post<CartProducts>(`${environment.apiUrl}/${this.url}/addtocart`,prod);
 }

  
  createGroceries(addGroceriesRequest:Groceries):Observable<Groceries>
  {
     
    return this.http.post<Groceries>(`${environment.apiUrl}/${this.url}`,addGroceriesRequest);
  }
  
  getupdateGroceries(id:number):Observable<Groceries>
  {
    return this.http.get<Groceries>(`${environment.apiUrl}/${this.url}`+ '/' + id) ;
  }
  CreateOrderProducts(obj:orders):Observable<orders>{
    return this.http.post<orders>(`${environment.apiUrl}/${this.url}/addtoorders`,obj)
  }
  GetOrderProductsUser(name:string):Observable<orders[]>{
    return this.http.get<orders[]>(`${environment.apiUrl}/${this.url}/getorderdata`+ '/'+ name);
  }
  public DeleteCartProduct(prod:CartProducts): Observable<CartProducts[]>{

    return this.http.delete<CartProducts[]>(`${environment.apiUrl}/${this.url}`+'/'+'CartProduct'+'/'+prod.id);

   }

  updateGroceries(id:number,obj:Groceries):Observable<Groceries>
  {
    return this.http.put<Groceries>(`${environment.apiUrl}/${this.url}`+ '/' + id, obj) ;
  }
  editcartproduct(obj:CartProducts):Observable<CartProducts>{
    return this.http.put<CartProducts>(`${environment.apiUrl}/${this.url}/editCartProduct`, obj) ;
  }
  getcartdatauser(name:string):Observable<CartProducts[]>{
    return this.http.get<CartProducts[]>(`${environment.apiUrl}/${this.url}/CartDataUser`+ '/'+ name);
  }

  getFromCart():Observable<CartProducts[]>{
    return this.http.get<CartProducts[]>(`${environment.apiUrl}/${this.url}/getcart`) ;
  }

   deleteGroceries(id:number):Observable<Groceries>{
    return this.http.delete<Groceries>(`${environment.apiUrl}/${this.url}`+ '/' + id) ;
   }
   signUp(userObj:any)
   {
    return this.http.post<any>(`${this.usersurl}register`,userObj);
   }
   login(loginObj:any)
   {
    return this.http.post<any>(`${this.usersurl}authenticate`,loginObj);
   }
   public CreateComments(prod:Comments):Observable<Comments>{
    return this.http.post<Comments>(`${environment.apiUrl}/${this.url}/Comments`,prod) ;
   }
   
   public getComments(prod:Groceries):Observable<Comments[]>{
    return this.http.get<Comments[]>(`${environment.apiUrl}/${this.url}/getComments` + '/' +prod.id) ;
   }
   


}
