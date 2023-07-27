import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() totalCount!:number;
  @Input() pageSize!:number;
  @Output() pageChanged = new EventEmitter<any>();
  constructor(){}

  changePage(event:any){
    this.pageChanged.emit({page:event.page});

  }
}
