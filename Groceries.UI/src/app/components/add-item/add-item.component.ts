import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Groceries } from 'src/app/models/groceries';
import { GroceriesService } from 'src/app/services/groceries.service';


@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent {
 
  addGroceriesRequest:Groceries = new Groceries;
  constructor(private groceriesService:GroceriesService,private router:Router){}

  ngOnInit():void{

  }
  adddata()
  {
    console.log(this.addGroceriesRequest)
      
    this.groceriesService.createGroceries(this.addGroceriesRequest).subscribe({
      next:(data) =>{
       console.log(data);
        this.router.navigate(['']);

      }
    })
  }
}
