import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ApiService } from '../service/api.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selected : Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions = {}; 
  totalEmployee:number=0
  admin:any={}

  editStatus:boolean=true

  status:boolean=true

    profileImage:string="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3IzsWIYIQxmhU7_59zfM5y1fJLqwoQrA2HAm5QlBWA-Jm13LwEdWy0XVRR7WIzHV42c&usqp=CAU"

  constructor(private api:ApiService){
    this.chartOptions={
      chart: {
        type: 'pie'
    },
    title: {
        text: 'Project Completion Report'
    },
    tooltip: {
        valueSuffix: '%'
    },
   
    plotOptions: {
        series: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: [{
                enabled: true,
                distance: 20
            }, {
                enabled: true,
                distance: -40,
                format: '{point.percentage:.1f}%',
                style: {
                    fontSize: '1.2em',
                    textOutline: 'none',
                    opacity: 0.7
                },
                filter: {
                    operator: '>',
                    property: 'percentage',
                    value: 10
                }
            }]
        }
    },
    credits:{
      enabled:false
    },
    series: [
        {
            name: 'Percentage',
            colorByPoint: true,
            data: [
                {
                    name: 'Project Fair',
                    y: 55.02
                },
                {
                    name: 'Media Player',
                    sliced: true,
                    selected: true,
                    y: 26.71
                },
                {
                    name: 'Redux E-Cart',
                    y: 1.09
                },
                {
                    name: 'Redux Counter Application',
                    y: 15.5
                },
                {
                    name: 'Simple Interest',
                    y: 1.68
                }
            ]
        }
    ]
    }
  }

  changeStatus(){
    this.status=!this.status
  }

  ngOnInit(): void {
      this.getTotalEmployee()
      this.api.loginApi().subscribe({
        next:(res:any)=>{
            console.log(res);
            this.admin=res
            if(res.profileImage){
                this.profileImage=res.profileImage
            }
            
        },
        error:(err:any)=>{
            console.log(err);  
        }
      })
  }

  getEditStatus(){
    this.editStatus=false
  }

  getTotalEmployee(){
    this.api.getAllEmployeeApi().subscribe({
        
        next:(res:any)=>{
            console.log(res);
            this.totalEmployee=res.length-1

        },
        error:(err:any)=>{
            console.log(err);
            
        }
        
    })

  }
  getFile(event:any){
    console.log(event.target.files[0]);

    //create an object for filereader

    const file = new FileReader()

    //convert the file into url

    file.readAsDataURL(event.target.files[0])

    //get the url

    file.onload = (event:any)=>{
        this.profileImage = event.target.result
        this.admin.profileImage=this.profileImage  
    }


  }
reset(){
    this.api.loginApi().subscribe({
        next:(res:any)=>{
            console.log(res);
            this.admin=res
            this.editStatus=true
            if(res.profileImage){
                this.profileImage=res.profileImage
            }
            else{
                this.profileImage='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr3IzsWIYIQxmhU7_59zfM5y1fJLqwoQrA2HAm5QlBWA-Jm13LwEdWy0XVRR7WIzHV42c&usqp=CAU'
            }
        },
        error:(err:any)=>{
            console.log(err);  
        }
      })

}

  updateAdmin(){

    this.api.updateAdminDetailsApi(this.admin).subscribe({
        next:(res:any)=>{
            console.log(res);
            this.admin=res
            this.profileImage=res.profileImage
            Swal.fire({
                title:"Wow",
                text:"Admin Details Updated",
                icon:"success"
            })
            this.editStatus=true
            
        },
        error:(err:any)=>{
            console.log(err);
            
        }

    })

  }

}
