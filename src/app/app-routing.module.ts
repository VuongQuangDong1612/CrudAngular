import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';

const routes: Routes = [
  {path:'product/:id/:typeAction', component: ProductDetailComponent},
  {path:'product/:id/:typeAction', component: ProductDetailComponent},
  {path:'product/:typeAction', component: ProductDetailComponent},
  {path:'product/:id/:typeAction', component: ProductDetailComponent},
  {path:'', component: HomeComponent},
  {path:'getListProducts', component: ProductListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
