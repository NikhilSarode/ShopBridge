import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { ShopbridgeInfoComponent } from "./shopbridge-info/shopbridge-info.component";

const routes=[
    {path:"",component:ShopbridgeInfoComponent},
    {path:"home",loadChildren:"./home/home.module#HomeModule"},
    {path:"**",component:PagenotfoundComponent}
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{

}