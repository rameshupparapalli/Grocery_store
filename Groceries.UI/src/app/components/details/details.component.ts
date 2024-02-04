
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Comments } from 'src/app/models/Comments';
import { CartProducts } from 'src/app/models/cartproducts';
import { Groceries } from 'src/app/models/groceries';
import { GroceriesService } from 'src/app/services/groceries.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  isLiked = false;
  session:any;
  cartId:string="";
  public userid!: number;
  commentsdata: Comments[] = [];
  quan: number = 1;
  @Input() maxRating: number = 5;
  @Input() currentRating: number = 0;
  @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();
  Cartproduct?:CartProducts;
  stars: number[];
  commentModel:Comments={
    id:0,
    productId:0,
    username:"",
    comment:""
  }
  groceriesDetails: Groceries = {
    id: 0,
    product: '',
    price: 0,
    description: '',
    image: '',
    discount : 0,
    category: '',
    weight: '',
    quantity: 0
  };

  constructor(
    private groceriesService: GroceriesService,
    private route: ActivatedRoute,
    private router: Router,
    private userStore: UserStoreService,
    private user:UserService,
    private toast:NgToastService
  ) {
    this.stars = Array(this.maxRating).fill(0).map((_, i) => i + 1);
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  ngOnInit(): void {
  
    this.userStore.getIdFromStore().subscribe((val) => {
      this.userid = val || this.user.getIdFromToken();
      
    });

    this.route.paramMap.subscribe({
      next: (params) => {
        const id = parseInt(params.get('id') || '0');
        console.log(params.get('username'))
        //console.log(params.get('userid'))
        let name=params.get('username');
        this.cartId=name as string;
        this.userid = this.userid as number;
        console.log(this.userid)

        if (id) {
          this.groceriesService.getupdateGroceries(id).subscribe({
            next: (response) => {
              this.groceriesDetails = response;
            }
          });
        }
      }
    });
  }
 
  decreaseQuantity() {
    if (this.quan > 1) {
      this.quan--;
      console.log(this.quan)
    }
  }

  increaseQuantity() {
    this.quan++;
    console.log(this.quan)
  }
  


  rate(rating: number) {
    this.currentRating = rating;
    this.ratingChanged.emit(rating);
  }

 addToCart(Product:Groceries)
 {
  if(this.cartId!="")
  {
    if(Product.quantity>=this.quan && this.quan>=1){

      Product.quantity-=this.quan;
      let Id=Product.id as number
  
      this.groceriesService.updateGroceries(Id,Product).subscribe(data=>{console.log("Done")});
  
      this.Cartproduct=new CartProducts;
  
      const id: number = Product.id!;
  
      this.Cartproduct.productId=id;
    
  
      this.Cartproduct.product=Product.product;
  
      this.Cartproduct.description=Product.description;
  
      this.Cartproduct.price=(Product.price-Product.discount)*this.quan;
  
      this.Cartproduct.quantity=this.quan;
  
      this.Cartproduct.discount=Product.discount;
  
      this.Cartproduct.image=Product.image;
      this.Cartproduct.weight=Product.weight;
  
      this.Cartproduct.category=Product.category;
  
      this.Cartproduct.username=this.cartId;
  
      this.groceriesService.createCartProducts(this.Cartproduct).subscribe(data=>{
        this.toast.success({detail:"Success",summary:"Added to cart",duration:5000});
        this.router.navigate(['/cart',this.cartId])
  
        console.log(data);
  
      })
  
    }
  
    else{
  
      this.toast.warning({detail:"Sorry",summary:"out of the stock",duration:5000});
  
    }
  }
  else{
    this.toast.warning({detail:"Error",summary:"please login",duration:5000});
    this.router.navigate(['/login'])
  }


 }

 Comments:string="";
 addComment(prod:Groceries)
 {
  if(this.cartId!="")
  {
      this.commentModel.productId=prod.id as number;
      this.commentModel.username=this.cartId;
      this.commentModel.comment=this.Comments;
        this.groceriesService.CreateComments(this.commentModel).subscribe(data =>{
          console.log(data);
        })
      this.Comments="";
      console.log(this.commentModel);
      window.location.reload();
 }
 else{
  this.toast.warning({detail:"Error",summary:"please login",duration:5000});
  this.router.navigate(['/login'])
}
}
Comment(prod:Groceries){
   
  this.groceriesService.getComments(prod).subscribe({
    next: (cmd) => {
      this.commentsdata = cmd;
      console.log(this.commentsdata);
      //console.log(cmd)

    }
  });
}



 
}
