import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { error } from 'highcharts';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  mailId:string=""
  password:string=""
constructor(private api:ApiService, private router:Router){}

  login(){
    if(!this.mailId || !this.password){
      alert('Please fill the form completley')
    }
    else{
      this.api.loginApi().subscribe({
        next:(result:any)=>{
          console.log(result);
          console.log(this.mailId);
          if(this.mailId == result.email && this.password == result.password ){
           Swal.fire({
            title:"Wow",
            text:"Login Successfull",
            icon:"success"
           })
           this.api.updateData(true)
            this.router.navigateByUrl('/dashboard')
          }
          else{
            Swal.fire({
              title:"Alert",
              text:"Invalid Email Id or Password",
              icon:"error"
             })
          }
          
          
        },
        error:(err:any)=>{
          console.log(err);
          
        }
      })

    }
  }
  }
