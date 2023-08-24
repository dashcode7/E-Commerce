import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { AccountService } from '../account.service';

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
      email:['',[Validators.required,Validators.email],[this.checkIfEmailExists.bind(this)]],
      password:['',[Validators.required]]
    })
  }
  signIn(){
    let user ={
      "email":this.loginForm.get('email')?.value,
      "password":this.loginForm.get('password')?.value
    }
    this.accountService.login(user).subscribe(x =>{
      console.log(x);
    })
  }
  checkIfEmailExists(control:FormControl){
    this.accountService.checkIfEmailExists(this.loginForm.get('email')?.value).subscribe(x =>{
      if(x == true){
        alert('emailExists')
        return {'emailExists':true};

      }
      else{
        return null;
      }
    })
  }

}
