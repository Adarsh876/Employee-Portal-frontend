import { Component } from '@angular/core';
import { AdminapiService } from '../services/services/adminapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email:string=''
  password:string=''

  constructor(private api:AdminapiService, private router:Router ){}


  login(){
    if(!this.email || !this.password){
      alert("please fill the form completely")
    }
    else{
      this.api.authorization().subscribe({
        next:(res:any)=>{
          const {email,password} = res
          if(email == this.email && password == this.password){
            alert("Login sucessfully")
            
            this.api.updatedata({d:true})

            localStorage.setItem("name",res.name)
            localStorage.setItem("password",res.password)
            // Navigate
            this.router.navigateByUrl('dashboard')
          }
          else{
            alert("Invalid email or password")
          }
        },
        error:(res:any)=>{
          console.log(res);
        }
      })
      
    }
  }

}
