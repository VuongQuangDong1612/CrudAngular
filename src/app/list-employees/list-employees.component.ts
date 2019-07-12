import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.scss']
})
export class ListEmployeesComponent implements OnInit {
  employees : any[];
  constructor(private employeeService : EmployeeService) { 

  }

  ngOnInit() {
    this.employeeService.getList().subscribe( (response : any ) => {
      this.employees = response;
      console.log(response);
    } );
  }

}
