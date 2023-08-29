import { Component } from '@angular/core';
import { AccountService } from '../account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent { 

  passwordPattern="(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$";
  registerForm!:FormGroup;
  constructor(private accountService:AccountService,private formbuilder:FormBuilder,private router:Router){}


  ngOnInit(){
    this.registerForm = this.formbuilder.group({
      displayName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email],[this.checkIfEmailExists.bind(this)]],
      password:['',[Validators.required,Validators.pattern(this.passwordPattern)]]
    })
  }
  checkIfEmailExists(){
    const obs = new Promise((resolve,reject)=>{
     this.accountService.checkIfEmailExists(this.registerForm.get('email')?.value).subscribe(x =>{
       if(x){
         resolve({'emailExists':true})
       }else{
         resolve(null)
       }
     })
 
    })
    return obs;
   }
  signUp(){
    let user = {
      "email":this.registerForm.get('email')?.value,
    "displayName":this.registerForm.get('displayName')?.value,
    "userName":this.registerForm.get('displayName')?.value,
    "passsword":this.registerForm.get('password')?.value
    }
    this.accountService.register(user).subscribe(x =>{
      this.router.navigate(['/shop'])

    })
  }

}
