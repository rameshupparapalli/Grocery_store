import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { GroceriesService } from 'src/app/services/groceries.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm!:FormGroup
  cp:string=""
  constructor(private fb:FormBuilder,private registerService:GroceriesService,private router:Router, private toast:NgToastService)
  {
  
  
  }
  ngOnInit():void
  {
    this.signUpForm=this.fb.group({
      username:['',Validators.required],
      email:['',Validators.required],
      // phone:['',Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    // confirmpassword: ['', [Validators.required, Validators.minLength(8)]]
    },
    {
      validator: this.passwordMatchValidator 
    });
  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password');
    const confirmPassword = formGroup.get('confirmpassword')!; 
  
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword.setErrors(null);
    }
  }
  
  
  onSignup()
  {
    if(this.signUpForm.valid)
    {
      const formData = { ...this.signUpForm.value };
      delete formData.confirmpassword;
      //send data
      console.log(this.signUpForm.value);
      this.registerService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res => {
          
          this.toast.success({detail:"Success",summary:"Registration Success",duration:5000});


          console.log(res);
          this.signUpForm.reset();
          this.router.navigate(['login'])
        }),
        error:(err =>{
          // console.log(err);
          this.toast.error({detail:"Error",summary:err?.error.message,duration:5000});

          // alert(err?.error.message)
          // alert("hii")

         
        })
      })
      console.log(this.signUpForm.value);
    }
    else{
      //error
      this.validateAllFormFields(this.signUpForm)
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
