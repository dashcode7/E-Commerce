import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'Client';


  constructor(private basketService:BasketService) {}

  ngOnInit(){ 
    const id= localStorage.getItem('basket_id')
    if(id) this.basketService.getBasket(id)

  }
}
