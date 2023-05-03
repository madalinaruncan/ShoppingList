import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './components/products/list-product/list-product.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailProductComponent } from './components/products/detail-product/detail-product.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { DeleteProductComponent } from './components/products/delete-product/delete-product.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'products', component: ListProductComponent },
  { path: 'product/detail/:id', component: DetailProductComponent },
  { path: 'product/delete/:id', component: DeleteProductComponent },
  { path: 'product/add', component: CreateProductComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
