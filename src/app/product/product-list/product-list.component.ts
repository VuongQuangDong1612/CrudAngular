import { TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { Category } from 'src/app/entity/category/category.component';
import { CategoryService } from '../../service/category.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material';
import { ConfirmationDeleteDialogComponent } from '../../popup/confirmation-delete-dialog/confirmation-delete-dialog.component'
import { IfStmt } from '@angular/compiler';

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

   private page :number = 0;
   private pageArray : Array<number>;
   private sizePage : number = 2;
   private totalPage : number;
   disableClickPage : boolean;

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
    this.productService.getProductList(this.page, this.sizePage).subscribe((response : any ) =>{
      this.list_products = response.content;
      this.pageArray = new Array(response.totalPages);
      this.totalPage = response.totalPages-1;
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

  setPage(i, event:any ) {
    event.preventDefault();
    this.page = i;
    this.getListProduct();
  }

  clickNextPage() {
    this.page = this.page + 1;
    this.getListProduct();
  }

  clickPrePage(){
    if(this.page > 0){
      this.page = this.page - 1;
      this.getListProduct();
    }
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
            this.list_products = [];
            this.getListProduct();
          }, error => console.log(error)
        )
      }
    });
  }
}
