import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: Product;
  idParam : number;
  idCategoryParam : number;
  detailProductForm : FormGroup;

  constructor(private productService : ProductService , private activatedRoute : ActivatedRoute , private formBuilder : FormBuilder){
      this.detailProductForm = this.formBuilder.group({
        id :[""],
        name : [""],
        amount :[""],
        price : [""],
        origin : [""],
        dateofbirth :[""],
        category : [""]
      })
  }

  ngOnInit() { 
      this.activatedRoute.paramMap
      .pipe(
        mergeMap(params => { 
            this.idParam = +params.get('id');
            this.idCategoryParam = +params.get('categoryid');
            if(this.idParam !== null) {
              return this.productService.getProduct(this.idParam);
            }
            if(this.idCategoryParam !== null){
              return this.productService.getProductListByCategory(this.idCategoryParam);
            }
          
        })
      ).subscribe((res : Product) => {
        this.product = res;
        this.detailProductForm.patchValue({
            id :this.product.id,
            name : this.product.name,
            amount :this.product.amount,
            price : this.product.price,
            origin : this.product.origin,
            dateofbirth :this.product.dateOfBirth,
            category : this.product.category
        });
      });
  }
}
