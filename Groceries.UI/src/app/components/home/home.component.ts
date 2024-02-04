
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Groceries } from 'src/app/models/groceries';
import { GroceriesService } from 'src/app/services/groceries.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Groceries.UI';
  data: Groceries[] = [];
  value:string="";
  page: number = 1;
  count: number = 0;
  tableSize: number = 4;
  tableSizes: any = [5, 10, 15, 20];
  searchText: string = '';
  selectedCategory: string = '';
  public fullName:string="";
  public role!:string;
  public userid!:number

  constructor(private groceriesService: GroceriesService, private router: Router,private userstore:UserStoreService,private user:UserService,private toast:NgToastService) {
   
  }

  ngOnInit(): void {
    this.getdata();
    
    this.userstore.getRoleFromStore()
    .subscribe(val => {
      const roleFromToken=this.user.getRoleFromToken();
      this.role =val || roleFromToken;
    })

    this.userstore.getFullNameFromStore()
    .subscribe(val =>{
      const usernameFromToken=this.user.getFullNameFromToken();
      this.fullName=val || usernameFromToken;
      console.log(this.fullName)
     
    })

    this.userstore.getIdFromStore()
    .subscribe(val =>{
      const IdFromToken =this.user.getIdFromToken();
      this.userid=val || IdFromToken; 
    })

  }

  getdata(): void {
   
    this.groceriesService.getGroceries().subscribe({
      next: (groceries) => {
        this.data = groceries;
        
        
        if (this.searchText !== '') {
          this.page = 1;
          this.filterData();
        }

      }
    });
  }



  filterData(): void {
    if (this.searchText !== '') {
      this.data = this.data.filter(item => item.product.toLowerCase().includes(this.searchText.toLowerCase()));
    }
  }


  deleteGroceries(id: number | undefined) {
    if (id !== undefined) {
      this.groceriesService.deleteGroceries(id).subscribe({
        next: (response) => {
          this.router.navigate(['']);
          this.toast.success({detail:"Success",summary:"Item Deleted",duration:5000});

         // window.location.reload();
         
        },
        error: (response) => {
          console.log(response);
        }
      });
    }
  }

  postdata(id: number | undefined) {
    this.router.navigate(['/details', id,this.fullName]);
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    this.page = 1; // Reset page number when performing a new search
    this.getdata(); // Fetch data with the new search filter
  }

  onTableDataChange(event: number) {
    this.page = event;
    this.getdata(); // Fetch data for the selected page
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1; // Reset page number when changing table size
    this.getdata(); // Fetch data with the new table size
  }

  filteredData(): Groceries[] {
    let filteredData = this.data;

    // Apply search filter
    if (this.searchText !== '') {
      filteredData = filteredData.filter(
        (item) =>
          item.product.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    // Apply category filter
    if (this.selectedCategory !== '') {
      filteredData = filteredData.filter((item) => item.category === this.selectedCategory);
    }

    return filteredData;
  }
}


