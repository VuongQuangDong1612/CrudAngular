import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:'root'
})
export class CategoryService {
    private baseUrl = 'http://localhost:8088/api/categories' ;

    constructor(private _http : HttpClient){
    }

    getCategoriesList(): Observable<any> {
       return this._http.get(`${this.baseUrl}/getListCategories`);
    }
}