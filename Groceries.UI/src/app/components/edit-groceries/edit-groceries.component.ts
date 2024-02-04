import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Groceries } from 'src/app/models/groceries';
import { GroceriesService } from 'src/app/services/groceries.service';

@Component({
  selector: 'app-edit-groceries',
  templateUrl: './edit-groceries.component.html',
  styleUrls: ['./edit-groceries.component.css']
})
export class EditGroceriesComponent implements OnInit {
//  @Input() data?:Groceries;
//  @Output() dataUpdated=new EventEmitter<Groceries[]>();

groceriesDetails:Groceries={
  id:0,
  product:'',
  price:0,
  description:'',
  image:'',
  discount:0,
  category:'',
  weight:'',
  quantity:0
};
// heroToEdit?:Groceries;

 constructor(private groceriesService:GroceriesService,private route:ActivatedRoute,private router:Router,private toast:NgToastService){}
 ngOnInit():void{ 
 
  this.route.paramMap.subscribe({
    next:(params) =>{
      const id = parseInt(params.get('id') || '0');

      if(id)
      {
        this.groceriesService.getupdateGroceries(id)
        .subscribe({
          next:(response) => {
            console.log(response);
             this.groceriesDetails=response;

          }
        });
      }
    }
  })
}
updateGroceries()
{
  this.groceriesDetails.price = parseInt(this.groceriesDetails.price.toString(), 10);
  if (this.groceriesDetails.id !== undefined) {
    this.groceriesService.updateGroceries(this.groceriesDetails.id, this.groceriesDetails).subscribe({
      next: (response) => {
        this.router.navigate(['']);
        this.toast.success({detail:"Success",summary:"Update successfully",duration:5000});

      }
    });
  }
 

}
 

}
