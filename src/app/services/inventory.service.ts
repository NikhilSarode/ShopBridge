import { EventEmitter } from "@angular/core"
import { Inventory } from "../model/Inventory";

export class InventoryService{

    constructor(){
        let storedList=window.sessionStorage.getItem("inventoryList");
        if(!storedList){
            this.setInventoryListToStorage();
        }
        this.inventoryList=this.getInventoryListFromStorage();
    }

    inventoryList:Inventory[]=[
        {productid:1, productname: "Product-1",productdescription: "This is product-1",  productprice: 1200, productquantity: 5,productdelicate: "Yes"},  
        {productid:2, productname: "Product-2",productdescription: "This is product-2",  productprice: 60, productquantity: 2,productdelicate: "Yes"},
        {productid:3, productname: "Product-3",productdescription: "This is product-3",  productprice: 750, productquantity: 1,productdelicate: "Yes"},
        {productid:4, productname: "Product-4",productdescription: "This is product-4",  productprice: 555, productquantity: 8,productdelicate: "Yes"},
        {productid:5, productname: "Product-5",productdescription: "This is product-5",  productprice: 70, productquantity: 4,productdelicate: "Yes"},
        {productid:6, productname: "Product-6",productdescription: "This is product-6",  productprice: 3500, productquantity: 8,productdelicate: "Yes"},
        {productid:7, productname: "Product-7",productdescription: "This is product-7",  productprice: 800, productquantity: 7,productdelicate: "Yes"},
        {productid:8, productname: "Product-8",productdescription: "This is product-8",  productprice: 35, productquantity: 8,productdelicate: "Yes"},
        {productid:9, productname: "Product-9",productdescription: "This is product-9",  productprice: 850, productquantity: 2,productdelicate: "Yes"},
        {productid:10, productname: "Product-10",productdescription: "This is product-10",  productprice: 200, productquantity: 1,productdelicate: "Yes"}   
    ];
    
    selectedInventory=new EventEmitter<Inventory>();
    inventoryListChange=new EventEmitter<Inventory[]>();

    getInventoryListFromStorage(){
        return JSON.parse(window.sessionStorage.getItem("inventoryList"));
    }

    setInventoryListToStorage(){
        window.sessionStorage.setItem("inventoryList",JSON.stringify(this.inventoryList));
    }

    saveInventory(inventory):Promise<Inventory>{
        //Ideally http service should be called here. Since this is just frontend project I am using setTimeout
        //to simulate async behaviour
        return new Promise((resolve)=>{
            setTimeout(()=>{
                let existing =false;
                this.inventoryList.forEach((item:Inventory,index)=>{
                    if(item.productid===inventory.productid){
                        this.inventoryList[index]=inventory;
                        existing=true;
                    }
                });
                if(!existing){
                    inventory.productid= this.inventoryList.length>0?this.inventoryList[this.inventoryList.length-1].productid+1:1;
                    this.inventoryList.push(inventory);
                }
                this.inventoryListChange.emit(this.inventoryList);
                this.setInventoryListToStorage();
                resolve(inventory);
            },700);
        })
    }

    deleteInventory(inventory:Inventory):Promise<Inventory>{
        //Ideally http service should be called here. Since this is just frontend project I am using setTimeout
        //to simulate async behaviour
        return new Promise((resolve)=>{
            setTimeout(()=>{
                this.inventoryList.forEach((item:Inventory,index)=>{
                    if(item.productid===inventory.productid){
                        this.inventoryList.splice(index,1);
                    }
                });
                this.setInventoryListToStorage();
                resolve(inventory);
            },700);
        });
    }

    getInventoryList(pageNo):Promise<Inventory[]>{
        //Ideally http service should be called here. Since this is just frontend project I am using setTimeout
        //to simulate async behaviour
        return new Promise((resolve)=>{
            setTimeout(()=>{
                resolve(this.paginate(this.getInventoryListFromStorage(),4,pageNo));
            },700);
        })
    }

    paginate(array, page_size, page_number) {
        let beginIndex=array.length-(page_size*(page_number));
        return array.slice(beginIndex<0?0:beginIndex,array.length-(page_size*(page_number-1))).reverse();
      }
}