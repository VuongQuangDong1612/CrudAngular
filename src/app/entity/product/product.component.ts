
import { Category } from '../category/category.component';

export class Product {
  id: number;
  name:string;
  origin:string;
  amount: number;
  price:number;
  dateOfBirth : Date;
  categoryEntity:any;

  constructor() { }

}
