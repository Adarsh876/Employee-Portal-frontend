import { Component } from '@angular/core';
import { employeeModel } from '../employee.model';
import { AdminapiService } from '../services/services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  
  // variable to store the value from the input box which have the same structure of the employee model
  employee:employeeModel = {}

  constructor(private api:AdminapiService,private router:Router){}

  cancelEmployeee(){
    this.employee={}
  }

  addEmployee(){
    console.log(this.employee);

    if(!this.employee.name || !this.employee.id || !this.employee.status || !this.employee.email){
      alert("Please fill the form completely")
    }
    else{
      this.api.addEmployeeApi(this.employee).subscribe({
        next:(res:employeeModel)=>{
          console.log(res);
          alert(`${res.name} added successfully`)
          this.employee={}
          this.router.navigateByUrl('employees')
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })
      
    }
  }

}
