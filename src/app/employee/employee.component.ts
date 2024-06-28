import { Component, OnInit } from '@angular/core';
import { EmpModel } from '../employee.model';
import { ApiService } from '../service/api.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmpModel[]=[]

  searchKey:string=""

  //for pagination
  p: number = 1;

  adminLogin = new Date()

  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.getAllEmployee()
  }
  getAllEmployee(){
    this.api.getAllEmployeeApi().subscribe({
      next:(res:any)=>{
        //console.log(res);
        this.allEmployee=res
        
      },
      error:(err:any)=>{
       // console.log(err);
        
      }
    })
  }

  sortId(){
    this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
  }

  sortName(){
    //localeCompare() - method return 1, -1, 0 (after,before,equal)

    this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  removeEmployee(id:string){
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.getAllEmployee()
        
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }


  generatePdf(){
    const pdf = new jsPDF()

    const head = [['User Id','UserName', 'Email','Status']]
    const body:any = []

    this.allEmployee.forEach((item)=>{
      if(item.id!='1'){
        if(item.status=='1'){
          body.push([item.id, item.name, item.email,'Active'])

        }
        else{
          body.push([item.id, item.name, item.email,'Inactive'])

        }
      }
    })
    pdf.setFontSize(16)
    pdf.text('Employee Details',10,10)
    autoTable(pdf,{
      head,
      body
    })

    //new window
    pdf.output('dataurlnewwindow')

    pdf.save('EmployeeDetails.pdf')
  }


}
