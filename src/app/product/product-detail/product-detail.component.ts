import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/entity/category/category.component';
import { error } from 'protractor';


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
  listCategories : Category[];

  typeAction : string;
  isButtonHidden : boolean;
  isInputIdDisable : boolean;
  isInputIdHidden : boolean;

  constructor(private productService : ProductService , private activatedRoute : ActivatedRoute , private formBuilder : FormBuilder, private categoryService : CategoryService ,  private router: Router){
      this.detailProductForm = this.formBuilder.group({
        id :[{value :'' , disabled : true} ],
        name : [""],
        amount :[""],
        price : [''],
        origin : [""],
        dateOfBirth :[""],
        category : [""]
      })
  }

  ngOnInit() { 
    this.getListCategories();

    this.idParam = +this.activatedRoute.snapshot.paramMap.get("id");
    
    this.typeAction = this.activatedRoute.snapshot.paramMap.get("typeAction");
   
    switch(this.typeAction){
      case 'detail':
        this.isButtonHidden = true;
        this.isInputIdDisable = true;
        this.isInputIdHidden = false;
        break;
      case 'update':
        this.isButtonHidden = false;
        this.isInputIdDisable = true;
        this.isInputIdHidden = false;
        break;
      case 'create':
        this.isButtonHidden = false;
        this.isInputIdDisable = false;
        this.isInputIdHidden = true;
        break;
        
    }
       
 

    if(this.idParam != null){
      this.getProduct(this.idParam);
    }
  }

  getListCategories(){
    this.categoryService.getCategoriesList().subscribe((response : any) =>{
      this.listCategories = response
    });
  }

  getProduct(idProduct : number){
    this.productService.getProduct(idProduct).subscribe((res : Product) => {
      this.product = res;
      this.detailProductForm.patchValue({...res, category: res.categoryEntity.id, dateofbirth :res.dateOfBirth});
    })
  }

  saveUpdateProduct(){
    this.product = <Product> this.detailProductForm.getRawValue();
    this.product.categoryEntity = this.listCategories.find(v => v.id === this.detailProductForm.get('category').value);
    this.product.price = +this.detailProductForm.get('price').value;
    console.log(this.product)

    this.productService.updateProduct(this.product).subscribe(
      success => {
        alert("Done");
        this.router.navigate(['getListProducts']);
      },
      error => {
        alert("Failed");
      }
    );
  } 
}
