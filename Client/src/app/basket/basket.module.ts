import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { BasketRoutingModule } from './basket-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    BasketRoutingModule,
    HttpClientModule
  ]
})
export class BasketModule { }
