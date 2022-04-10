import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inventory } from 'src/app/model/Inventory';
import { PaginationService } from 'src/app/pagination/pagination.service';
import { AlertService } from 'src/app/_alert';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css'],
  providers:[NgxSpinnerService]
})
export class InventoryListComponent implements OnInit {
  inventoryList=[];
  selectedInventory:Inventory;
  subscriptions=[];

  constructor(private inventoryService:InventoryService, private paginationService:PaginationService,
    private spinnerService: NgxSpinnerService, private alertService:AlertService) {
    this.setInventoryList(this.getCurrentPage());
   }

  ngOnInit() {
    this.subscriptions.push(this.inventoryService.selectedInventory.subscribe(
      (selectedInventory:Inventory)=>{
        this.selectedInventory=selectedInventory;
      }
    ));
    this.subscriptions.push(this.inventoryService.inventoryListChange.subscribe(
      (inventoryList)=>{
       // if(this.getCurrentPage()===1)
          this.setInventoryList(this.getCurrentPage());
      }
    ));
  }

  getTotalPagesCount(){
    let totalItems=this.inventoryService.inventoryList.length;
    return Math.max(Math.ceil(totalItems/4),1);
  }

  getCurrentPage(){
    return this.paginationService.getCurrnetPageNo();
  }

  onInventorySelect(selectedInventory:Inventory){
    this.inventoryService.selectedInventory.emit(selectedInventory);
  }

  deleteInventory(selectedInventory:Inventory){
    this.spinnerService.show();  
    this.inventoryService.deleteInventory(selectedInventory).then(()=>{
      this.setInventoryList(this.getCurrentPage());
      if(this.selectedInventory && this.selectedInventory.productid===selectedInventory.productid){
        this.inventoryService.selectedInventory.emit(undefined);
      }
      this.spinnerService.hide();  
      this.alertService.success("Inventory deleted successfully",{autoClose:true})
    });
  }

  onPageNumberChanged(pageNo){
      this.setInventoryList(pageNo);
  }

  setInventoryList(pageNo){
    this.inventoryService.getInventoryList(pageNo).then((inventoryList)=>{
      this.inventoryList=inventoryList;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
