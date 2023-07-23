import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from './models/Product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  title = 'Client';
  Products:Product[]=[] 


  constructor(private http:HttpClient) {
    
  }

  ngOnInit(): void {
    this.http.get<Product[]>('http://localhost:5190/api/Products').subscribe({
    next: res =>{this.Products = res},
    error: error =>{console.log(error)},
    complete:() =>{console.log('Request Completed')}

  })
  }
}
