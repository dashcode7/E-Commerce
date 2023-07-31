import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket!:Observable<Basket|null>;

  constructor(private basketService:BasketService){}

  ngOnInit(){
   this.basket =  this.basketService.basket$
  }
  getCount(item:BasketItem[]){
      return item.reduce((sum,val) =>sum+val.quantity,0) 
  }

}
