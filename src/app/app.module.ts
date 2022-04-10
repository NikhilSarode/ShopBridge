import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertModule } from './_alert';
import { ShopbridgeInfoComponent } from './shopbridge-info/shopbridge-info.component';

@NgModule({
  declarations: [
    AppComponent,
    ShopbridgeInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
