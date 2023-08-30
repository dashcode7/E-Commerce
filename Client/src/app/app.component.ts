import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { AccountService } from './account/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'Client';


  constructor(private basketService:BasketService,private accountService:AccountService) {}

  ngOnInit(){ 
    this.getBaasket();
    this.getCurrentUser();

  }
  getBaasket(){
    const id= localStorage.getItem('basket_id')
    if(id) this.basketService.getBasket(id)
  }
  getCurrentUser(){
    let token = localStorage.getItem('token');
    this.accountService.loadCurrentUser(token).subscribe();
  }
}
