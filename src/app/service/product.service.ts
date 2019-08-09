import { catchError, retry } from 'rxjs/operators';
import { Product } from './../entity/product/product.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
    providedIn:'root'
})
export class ProductService {
    private baseUrl = 'http://localhost:8088/api/products' ;

    constructor(private _http : HttpClient){
    }

    getProductList(page : number , size : number ): Observable<any> {
       return this._http.get(`${this.baseUrl}/getListProducts/?page=`+page+`&size=`+size);
    }

    getProduct(id : number): Observable<any> {
        return this._http.get(`${this.baseUrl}/getProduct/${id}`);
    }

    getImageProduct(id: number) {
        return this._http.get(`${this.baseUrl}/getImageProduct/${id}`);
    }

    getProductListByCategory(id: number):  Observable<any> {
        return this._http.get(`${this.baseUrl}/getProductByCategory/${id}`);
    } 
    
    updateProduct(product : Product ){
        return this._http.post<Product>(`${this.baseUrl}/saveProduct` ,product);
    }

    removeProduct(id : number) {
        return this._http.delete(`${this.baseUrl}/deleteProduct/${id}`);
    }

    uploadImg(totalFormData){
        return this._http.post(`${this.baseUrl}/uploadImgProduct`, totalFormData , {
            // reportProgress: true,
            // observe : 'events',
            responseType: 'text'
        })
    }

}