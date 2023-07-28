import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PaginationHeaderComponent } from './pagination-header/pagination-header.component';
import { PaginationComponent } from './pagination/pagination.component';
import { CarouselModule} from 'ngx-bootstrap/carousel'

@NgModule({
  declarations: [
    PaginationHeaderComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  exports:[PaginationModule,PaginationHeaderComponent,PaginationComponent,CarouselModule]
})
export class SharedModule { }
