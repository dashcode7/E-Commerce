import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket.service';
import { Basket, BasketItem } from 'src/app/shared/models/basket.model';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basket!:Basket | null;

  constructor(private basketService:BasketService){}

  ngOnInit(){
    this.basketService.basket$.subscribe( x =>{
      this.basket = x??null;
      console.log(this.basket);
      
    })
  }
  RemoveItemFromBasket(id:number,quantity:number){
    this.basketService.removeItemFromBasket(id,quantity);
  }
  addItemToBasket(item:BasketItem){
    this.basketService.UpdateBasket(item);
  }

  


}
