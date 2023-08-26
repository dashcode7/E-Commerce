import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';
import { Observable, map, of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;

  constructor(private builder:FormBuilder,private accountService:AccountService){}

  ngOnInit(){
    this.loginForm = this.builder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  signIn(){
    let user ={
      "email":this.loginForm.get('email')?.value,
      "password":this.loginForm.get('password')?.value
    }
    console.log(this.loginForm)
    this.accountService.login(user).subscribe(x =>{
      console.log(x);
    })
  }
  checkIfEmailExists(){
   const obs = new Promise((resolve,reject)=>{
    this.accountService.checkIfEmailExists(this.loginForm.get('email')?.value).subscribe(x =>{
      if(x){
        resolve({'emailExists':true})
      }else{
        resolve(null)
      }
    })

   })
   return obs;
  }

}
