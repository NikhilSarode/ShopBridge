import { NgModule } from "@angular/core";
import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { InventoryListComponent } from './left-panel/inventory-list/inventory-list.component';
import { InventoryFormComponent } from './right-panel/inventory-form/inventory-form.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { RightPanelComponent } from './right-panel/right-panel.component';
import { InventoryService } from "../services/inventory.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ClickStopPropagation } from "../directives/click-stop-propagation.directive";
import { PaginationModule } from "../pagination/pagination.module";
import { PaginationService } from "../pagination/pagination.service";
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
    declarations:[
        HomeComponent,
        InventoryListComponent,
        InventoryFormComponent,
        LeftPanelComponent,
        RightPanelComponent,
        ClickStopPropagation
    ],
    imports:[
        HomeRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        FormsModule,
        PaginationModule,
        NgxSpinnerModule
    ],
    providers:[
        InventoryService,
        PaginationService
    ]
})
export class HomeModule{

}