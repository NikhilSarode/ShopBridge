import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Inventory } from 'src/app/model/Inventory';
import { AlertService } from 'src/app/_alert';
import { InventoryService } from '../../../services/inventory.service';

@Component({
  selector: 'inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.css'],
  providers:[NgxSpinnerService]
})
export class InventoryFormComponent implements OnInit,OnDestroy {
  inventoryForm:FormGroup;
  selectedInventory:Inventory;
  subscriptions=[];

  constructor(private inventoryService:InventoryService, private alertService:AlertService,
    private spinnerService:NgxSpinnerService) { }

  ngOnInit() {
    this.inventoryForm=new FormGroup({
      "productid":new FormControl(),
      "productname":new FormControl(null,[Validators.required]),
      "productdescription":new FormControl(),
      "productprice":new FormControl(null,[Validators.required]),
      "productquantity":new FormControl(1,[this.quantityValidator.bind(this)]),
      "productdelicate":new FormControl()
    });

    this.subscriptions.push(this.inventoryService.selectedInventory.subscribe(
      
      (selectedInventory:Inventory)=>{
        this.selectedInventory=selectedInventory;
        if(!selectedInventory){
          this.resetForm();
          return;
        }
        this.inventoryForm.setValue({
          "productid":selectedInventory.productid,
          "productname":selectedInventory.productname,
          "productdescription":selectedInventory.productdescription,
          "productprice":selectedInventory.productprice,
          "productquantity":selectedInventory.productquantity,
          "productdelicate":selectedInventory.productdelicate
        });
      }
    ));
  }

  onSubmit(){
    let inventory:Inventory=this.inventoryForm.value;
    this.spinnerService.show();
    this.inventoryService.saveInventory(inventory).then(()=>{
      this.inventoryService.selectedInventory.emit(undefined);
      this.alertService.success("Inventory saved successfully",{autoClose: true});
      this.spinnerService.hide();
    });
  }

  quantityValidator(control:FormControl):{[s:string]:boolean}{
      if(isNaN(control.value) || control.value<1)return {"invalidquantity":true};
      return null;
  }

  resetForm(){
    this.inventoryForm.reset();
    this.inventoryForm.patchValue({
      "productid":undefined
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription)=>{
      subscription.unsubscribe();
    })
  }
}
