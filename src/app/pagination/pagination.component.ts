import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginationService } from './pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() totalPages:number;
  @Output() pageNumberChanged=new EventEmitter<number>();
  pageCountDisplay:string;

  constructor(private paginationService:PaginationService) {
    
   }

  ngOnInit() {
    this.pageCountDisplay=this.getPageCountDisplay();
  }

  setPage(pageNo){
    this.paginationService.setCurrnetPageNo(pageNo);
    this.pageNumberChanged.emit(pageNo);
    this.pageCountDisplay=this.getPageCountDisplay();
  }

  getPageCountDisplay(){
    return this.paginationService.getCurrnetPageNo().toString()+"/"+this.totalPages.toString();
  }

  onNext(){
    this.setPage(Math.min(this.paginationService.getCurrnetPageNo()+1,this.totalPages));
  }

  onPrev(){
    this.setPage(Math.max(this.paginationService.getCurrnetPageNo()-1,1));
  }
}
