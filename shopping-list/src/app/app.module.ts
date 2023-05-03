import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { FormsModule } from '@angular/forms';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { DeleteProductComponent } from './components/products/delete-product/delete-product.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ListProductComponent,
    MessagesComponent,
    DetailProductComponent,
    DashboardComponent,
    CreateProductComponent,
    DeleteProductComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
