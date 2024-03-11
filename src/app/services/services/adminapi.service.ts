import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { employeeModel } from 'src/app/employee.model';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

  base_url = "http://localhost:3000"
  
  public sharedData = new BehaviorSubject(false)

  updatedata(data:any){
    // next is used to access new value
    this.sharedData.next(data)
  }

  authorization(){
    return this.http.get(`${this.base_url}/employee/1`)
  }

  addEmployeeApi(employee:employeeModel){
    return this.http.post(`${this.base_url}/employee`,employee)
  }

  getAllEmployeeApi(){
    return this.http.get(`${this.base_url}/employee`)
  }

  deleteEmployeeApi(id:string){
    return this.http.delete(`${this.base_url}/employee/${id}`)
  }

  viewEmployeeApi(id:string){
    return this.http.get(`${this.base_url}/employee/${id}`)
  }

  updateEmployeeApi(id:any,employee:any){
    return this.http.put(`${this.base_url}/employee/${id}`,employee)
  }

  updateAdminApi(admin:any){
    return this.http.put(`${this.base_url}/employee/1`,admin)
  }
}
