import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orders } from 'src/app/models/orders';
import { GroceriesService } from 'src/app/services/groceries.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  Products:orders[]=[];
MyOrders:string="";
  
  
  
  
  TotalPrice=0;
  
  TotalDiscount=0;
  
  
  
  
  constructor(private http:HttpClient, private productservice : GroceriesService,private route1:ActivatedRoute){}
  
  
  
  
  ngOnInit(): void {
  
    this.route1.paramMap.subscribe(params=>{
  
      let name=params.get('username')
  
      this.MyOrders=name as string;
  
      console.log(this.MyOrders);
  
      this.productservice.GetOrderProductsUser(this.MyOrders).subscribe((result:orders[])=>{
  
        this.Products=result;
        console.log(this.Products)
  
        for(let item of this.Products){
  
          this.TotalPrice+=item.price;
  
          this.TotalDiscount+=(item.discount*item.quantity);
  
        }
  
      })
  
    })
  }
}
