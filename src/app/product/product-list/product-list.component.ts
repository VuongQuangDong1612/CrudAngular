import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { Category } from 'src/app/entity/category/category.component';
import { CategoryService } from '../../service/category.service';
import { FormControl } from '@angular/forms';
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
  constructor(private productService : ProductService, private categoryService : CategoryService) { }

  ngOnInit() {
      this.getListProduct();
      this.getListCategories();

      this.searchByCategoryControl.setValue("defaultvalue");

      this.searchByCategoryControl.valueChanges.subscribe( valueChange =>{
        this.categoryId = +valueChange;
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
      console.log(response);
    })
  }

  getListProductBycategory(){
    this.productService.getProductListByCategory(this.categoryId).subscribe((response : any ) =>{
      this.list_products = response;
      console.log(response);
  })
  }

}
