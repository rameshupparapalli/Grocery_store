import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EditGroceriesComponent } from './components/edit-groceries/edit-groceries.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddItemComponent } from './components/add-item/add-item.component';
import { DetailsComponent } from './components/details/details.component';
import {RoutegaurdGuard} from './guards/auth-guard.guard';
import {CartComponent} from './components/cart/cart.component';
import {OrdersComponent} from './components/orders/orders.component'
const routes: Routes = [
  {
    path:'',
    redirectTo:'home',pathMatch:'full',
   
  },
  {
    component:HomeComponent,
    path:''
   },
   {
    path:'home',
    component:HomeComponent,
    
   },
  {
    path:'edit/:id',
    component:EditGroceriesComponent,
    canActivate:[RoutegaurdGuard]
  },
  {
    path:'details/:id/:username',
    component:DetailsComponent,
    
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:"add",
    component:AddItemComponent,
    canActivate:[RoutegaurdGuard]
  },
  {
    path:"orders/:username",
    component:OrdersComponent,
    canActivate:[RoutegaurdGuard]
  },
  {
    path:"cart/:username",
    component:CartComponent,
    canActivate:[RoutegaurdGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
