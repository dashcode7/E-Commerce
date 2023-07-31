import { Component, OnInit } from '@angular/core';
import { BasketCost } from '../models/basket.model';
import { BasketService } from 'src/app/basket/basket.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-total',
  templateUrl: './order-total.component.html',
  styleUrls: ['./order-total.component.scss']
})
export class OrderTotalComponent implements OnInit{
  basketTotal!:BasketCost|null;

  constructor(private basketService:BasketService){}


  ngOnInit() {
   this.basketService.basketTotal$.subscribe(x =>{
    this.basketTotal = x??null;
   });
  }

}
