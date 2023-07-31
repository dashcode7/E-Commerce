import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component'

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports:[PaginationModule,PaginationHeaderComponent,PaginationComponent,CarouselModule,OrderTotalComponent]
})
export class SharedModule { }
