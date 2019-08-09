import { Component, OnInit } from '@angular/core';
import { Product } from '../../entity/product/product.component';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { mergeMap, catchError } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/entity/category/category.component';
import { error } from 'protractor';
import { HttpEventType } from '@angular/common/http';


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

  imgurl : string;
  listImgBase64 : string[] = new Array();
  listImgResponse : string[];

  totalFileUpload : number;
  files : any;
  profileForm: FormGroup;

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

      this.profileForm = this.formBuilder.group({
        profile : [''],
        idproduct: ['']
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
        this.getImage();
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
       

    if(this.idParam != null && this.idParam != 0){
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

  getImage(){
    this.listImgBase64 = [];
    this.productService.getImageProduct(this.idParam ).subscribe((response : any) =>{
      this.listImgResponse  = response;
      for(let i = 0; i< response.length; i++){
        this.imgurl = 'data:image/JPEG;base64,' + response[i];
        this.listImgBase64.push(this.imgurl);
      }
      // console.error(this.listImgBase64)
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

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.files = event.target.files;
      // console.log(event.target.files.length);
      // console.log(this.files[0]);
      this.totalFileUpload = event.target.files.length;                             
      // this.profileForm.get('profile').setValue(files);
    }
  }

  onSubmitImg() {
    console.log(this.files);
    console.log(this.files[0].constructor.name);
    // let totalFormData : FormData[] = [];

    // const formData = new FormData();
    // formData.append('profile', this.files[0]);
    // formData.append('idproduct', this.detailProductForm.get('id').value);

    const formData = new FormData();
    for(let i = 0; i < this.totalFileUpload ; i++){
      formData.append('profile', this.files[i]);
    }
    formData.append('idproduct', this.detailProductForm.get('id').value);
    this.productService.uploadImg(formData).subscribe(
      res => {
          console.log(res);
          this.listImgBase64 = [];
          this.getImage();
      },
      err => console.log(err)
    );
  }
}
