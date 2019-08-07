import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './service/product.service';
import { CategoryService } from './service/category.service';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpErrorInterceptor } from './service/errorHandler.service';
import { ConfirmationDeleteDialogComponent } from './popup/confirmation-delete-dialog/confirmation-delete-dialog.component';
import { NgxPaginationModule } from 'ngx-pagination';

import { CustomMaterialModule } from './module/app.customMaterialModule';
import { FormatNumberDirective } from './service/formatNumber.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConfirmationDeleteDialogComponent,
    ProductListComponent,
    ProductDetailComponent,
    FormatNumberDirective
  ],
  imports: [
    BrowserModule,
    CustomMaterialModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    ProductService,
    CategoryService
  ],
  entryComponents: [ConfirmationDeleteDialogComponent]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
