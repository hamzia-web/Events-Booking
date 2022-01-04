import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import {ListProductsComponent} from "./components/list-products/list-products.component";
import {AdminComponent} from "./components/admin/admin.component";
import {CreateProductComponent} from "./components/create-product/create-product.component";
import {UpdateProductComponent} from "./components/update-product/update-product.component";

const routes: Routes = [
  {path: '', component: ProductsComponent },
  {path: 'list-products', component: ListProductsComponent},
  {path: 'admin', component: AdminComponent },
  {path: 'create-product', component: CreateProductComponent},
  {path: ':id', component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
