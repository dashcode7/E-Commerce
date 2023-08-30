import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';
import { Observable, map, of} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!:FormGroup;
 returnUrl!:string;
  constructor(private builder:FormBuilder,private accountService:AccountService,private router:Router,private activatedRoute:ActivatedRoute){
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop'
  }

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
      this.router.navigate([this.returnUrl]);
      console.log(x);
    })
  }
 

}
