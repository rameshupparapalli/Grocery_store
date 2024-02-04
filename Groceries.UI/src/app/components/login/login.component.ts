import { group } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GroceriesService } from 'src/app/services/groceries.service';
import { UserStoreService } from 'src/app/services/user-store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!:FormGroup;
constructor(private fb:FormBuilder,private loginService:GroceriesService,private router:Router,private toast:NgToastService,private auth:GroceriesService,
  private userStore:UserStoreService,private user:UserService)
{

}
ngOnInit():void{
this.loginForm=this.fb.group({
  email:['',Validators.required],
  password:['',Validators.required]
})

}
onSubmit()
{
  if(this.loginForm.valid)
  {
    console.log(this.loginForm.value);
    this.loginService.login(this.loginForm.value)
    .subscribe({
      next:(res) => {
       // alert(res.message);
       this.loginForm.reset();
       this.user.storeToken(res.token);
       const tokenPayLoad = this.user.decodedToken();
       this.userStore.setFullNameForStore(tokenPayLoad.name);
       this.userStore.setRoleForStore(tokenPayLoad.role);
       this.userStore.setIdFromStore(tokenPayLoad.userid)
        this.toast.success({detail:"Success",summary:res.message,duration:5000});
        
        this.router.navigate(['home']);
        

      },
      error:(err) =>{
       // alert(err?.error.message)
        this.toast.error({detail:"Error",summary:"User not Found",duration:5000});
      }
    })
    //send data to db
  }
  else{
    //error
 
    this.validateAllFormFields(this.loginForm);
    alert("invalid");
  }
}

private validateAllFormFields(formGroup:FormGroup)
{
Object.keys(formGroup.controls).forEach(field =>{
  const control =formGroup.get(field);
  if(control instanceof FormControl){
    control.markAsDirty({onlySelf:true});
  }
  else if(control instanceof FormGroup)
  {
    this.validateAllFormFields(control)
  }
})
}
}
