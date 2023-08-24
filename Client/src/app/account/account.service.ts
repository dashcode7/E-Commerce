import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = 'http://localhost:5190/api/'
  private currentUser =new BehaviorSubject<User | null>(null);
  currentuser$ = this.currentUser.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

  login(value:any):Observable<User>{
    return this.http.post<User>(this.apiUrl+'Account/login',value).pipe(
      map( x =>{
        localStorage.setItem("token",x.token);
        this.currentUser.next(x);
        return x;
      })
    )
  }
  register(value:any):Observable<User>{
    return this.http.post<User>(this.apiUrl+'Account/Register',value).pipe(
      map( x =>{
        localStorage.setItem("token",x.token);
        this.currentUser.next(x);
        return x;
      })
    )
  }
  logout(){
    localStorage.removeItem("token");
    this.currentUser.next(null);
    this.router.navigate(['/'])
  }
  checkIfEmailExists(email:string){
    return this.http.get<boolean>(this.apiUrl+'Account/checkIfEmailExists?email='+email)
  }
}
