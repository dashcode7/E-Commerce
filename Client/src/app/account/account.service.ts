import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { User } from '../shared/models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiUrl = 'http://localhost:5190/api/'
  private currentUser =new ReplaySubject<User | null>(1);
  currentuser$ = this.currentUser.asObservable();

  constructor(private http:HttpClient,private router:Router) { }

  loadCurrentUser(token:string | null){
    if(token === null){
      this.currentUser.next(null);
      return of(null);
    }
    let headers= new HttpHeaders();
    headers = headers.set('Authorization',`Bearer ${token}`);
console.log(headers)
    return this.http.get<User>(this.apiUrl+'Account',{headers:headers}).pipe(
      map( x =>{
        if(x){
        localStorage.setItem("token",x.token);
        this.currentUser.next(x);
        return x;
        }
        else{
          return null;
        }
      })
    )
  }

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
