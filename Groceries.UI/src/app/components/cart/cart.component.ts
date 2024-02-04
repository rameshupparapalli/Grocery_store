import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { CartProducts } from 'src/app/models/cartproducts';
import { Groceries } from 'src/app/models/groceries';
import { orders } from 'src/app/models/orders';
import { GroceriesService } from 'src/app/services/groceries.service';
import { UserStoreService } from 'src/app/services/user-store.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private groceriesService: GroceriesService, private router: Router, private toast:NgToastService,private userstore:UserStoreService,private route1:ActivatedRoute) {}
  data: CartProducts[] = [];
  totalprice=0;
  cartId:string="";
  Product =new orders() 
  public userid!: number;
  CartUserName:string="";
  AdminProd: Groceries={

    id:0,
    product:'',
    description:'',
    category:'',
    price:0,
    image:'',
    quantity:0,
    discount:0,
    weight:''
   
  
  };
  ngOnInit(): void {
    this.getdata();
    this.Total();
    
   
  }
  getdata(): void {

    this.route1.paramMap.subscribe(params=>{

      let name=params.get('username');
      console.log(name)
      this.cartId=name as string;
  
      this.CartUserName=name as string;
  
      this.groceriesService.getcartdatauser(this.CartUserName).subscribe((result:CartProducts[])=>{
  
        this.data=result;
        this.Total();
  
      })
  
    })
  }
 
  Total(){
    let total = 0;
  
    for(let item of this.data){
      total += item.price;
    }
  
   this.totalprice=total;
  
  // this.router.navigate(['detail']);
  
   }
  
  
  
  
   NavigateTo(){
     this.router.navigate(['']);
    }
  IncreaseQuan(prod:CartProducts){

    prod.quantity+=1;
  
    var x  = prod.productId;
    console.log(x);
  
    
  
    this.CalledFunction(x);
  
    prod.price=(this.AdminProd.price-this.AdminProd.discount)*prod.quantity;
  
    this.groceriesService.editcartproduct(prod).subscribe(data=>{
  
      console.log(data);
      this.Total();
  
    })
  
   }
  DecreaseQuan(prod:CartProducts){

    prod.quantity-=1;
  
    var x  = prod.productId;
  
  
  
    this.CalledFunction(x);
  
    prod.price=(this.AdminProd.price-this.AdminProd.discount)*prod.quantity;
  
    this.groceriesService.editcartproduct(prod).subscribe(data=>{
  
      console.log(data);
      this.Total();
  
    })
  
   }
  CalledFunction(st:number){

    this.groceriesService.getupdateGroceries(st).subscribe((result:Groceries)=>{
  
      this.AdminProd=result;
  
    })

}
delete(prod:CartProducts)
{
    this.groceriesService.DeleteCartProduct(prod).subscribe((res) =>{
      console.log(res);
      

      window.location.reload();
      this.toast.success({detail:"Success",summary:"Item is Deleted",duration:5000});
    })
}
addOrder(products:CartProducts[])
{
  if(products.length>0)
  {
    for(let items of products){

      this.Product.productId=items.productId;
  
      this.Product.product=items.product;
  
      this.Product.description=items.description;
  
      this.Product.category=items.category;
  
      this.Product.price=items.price;
      this.Product.username=this.cartId;
  
      this.Product.image=items.image;
      this.Product.weight=items.weight;
  
      this.Product.quantity=items.quantity;
  
      this.Product.discount=items.discount;
  
      this.groceriesService.CreateOrderProducts(this.Product).subscribe(data=>{
  
        console.log(data);
        this.router.navigate(['/orders',this.cartId])
        this.toast.success({detail:"Success",summary:" order placed",duration:5000});

  
      })
  
    }
  }
  else{
    this.toast.warning({detail:"Awee",summary:"cart is empty",duration:5000});

  }
 

  
}



}