import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { Category } from 'src/app/entity/category/category.component';
import { CategoryService } from '../../service/category.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { ConfirmationDeleteDialogComponent } from '../../popup/confirmation-delete-dialog/confirmation-delete-dialog.component'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  
  list_products: Product[];
  listCategories : Category[];

  searchByCategoryControl = new FormControl();
  categoryId : number;
  buttonDisabled = true;
  constructor(private productService : ProductService, private categoryService : CategoryService, private router: Router , public dialog: MatDialog) { }

  ngOnInit() {
      this.getListProduct();
      this.getListCategories();

      this.searchByCategoryControl.setValue("0");

      // if combobox category === 0 --> button view disable else enable
      this.searchByCategoryControl.valueChanges.subscribe( valueChange =>{
        if(valueChange === "0"){
          this.buttonDisabled = true;
        } else {
          this.buttonDisabled = false;
          this.categoryId = +valueChange;
        }
      })
     
  }

  getListProduct(){
    this.productService.getProductList().subscribe((response : any ) =>{
      this.list_products = response;
    })
  }

  getListCategories(){
    this.categoryService.getCategoriesList().subscribe((response : any) =>{
      this.listCategories = response;
    })
  }

  getListProductBycategory(){
    this.productService.getProductListByCategory(this.categoryId).subscribe(
      data => this.list_products = data,
      error => {
        alert("No item");
        this.list_products = [];
      }
    );
  }

  onSelectDetail(idProduct : number, typeAction : string) {
    this.router.navigate(['product', idProduct, typeAction]);
  }

  onSelectUpdate(idProduct : number, typeAction : string){
    this.router.navigate(['product', idProduct, typeAction]);
  }

  onSelectCreate(){
    this.router.navigate(['product/create']);
  }

  confirmDialog(idProduct : number): void {
    const message = `Are you sure you want to do this?`;

    const dialogRef = this.dialog.open(ConfirmationDeleteDialogComponent, {
      maxWidth: "500px",
      data: message
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult) {
        this.productService.removeProduct(idProduct).subscribe (
          success => {
            alert("Delete Done");
            this.router.navigate(['getListProducts']);
          },
          error => {
            alert(123);
            alert("Delete Failed");
            this.router.navigate(['getListProducts']);
          }
        )
      }
    });
  }
}
