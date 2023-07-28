import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export class SubHeaderComponent implements OnDestroy{
  lastItem:any;
  subs:Subscription = new Subscription();

  constructor(public breadcrumbservice:BreadcrumbService){
   this.subs =  this.breadcrumbservice.breadcrumbs$.subscribe(x =>{
      this.lastItem = x[x.length - 1].label?.toString().toUpperCase();

    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
