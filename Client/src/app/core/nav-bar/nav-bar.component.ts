import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket.model';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket!:Observable<Basket|null>;
  user!:Observable<User|null>;
  constructor(private basketService:BasketService,private accountService:AccountService){}

  ngOnInit(){
   this.basket =  this.basketService.basket$;
   this.user = this.accountService.currentuser$;
  }
  getCount(item:BasketItem[]){
      return item.reduce((sum,val) =>sum+val.quantity,0) 
  }
  onLogout(){
    this.accountService.logout();
  }
}
