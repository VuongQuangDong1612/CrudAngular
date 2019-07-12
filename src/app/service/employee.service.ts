import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable()
export class EmployeeService {
    private apiUrl = "http://5d2405fbe39785001406ea6c.mockapi.io/api/employees" ;

    constructor(private _http : HttpClient){

    }

    getList(){
       return this._http.get(this.apiUrl);
    }
}