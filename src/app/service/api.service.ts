import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl = 'http://localhost:3000'

    //create object for behaviorSubject
  shareData = new BehaviorSubject(false)

  constructor(private http:HttpClient) {  }

  //function to update behaviour subject
  updateData(data:any){
    this.shareData.next(data)
  }

  loginApi(){
     return this.http.get(`${this.serverUrl}/employee/1`)
  }
//api to add employee
  addEmployeeApi(reqBody:any){
    return this.http.post(`${this.serverUrl}/employee`,reqBody)
  }

  //api to get all employee details

  getAllEmployeeApi(){
    return this.http.get(`${this.serverUrl}/employee`)

  }

  //api to delete employee

  deleteEmployeeApi(id:string){
    return this.http.delete(`${this.serverUrl}/employee/${id}`)
  }

  //api to edit employee

  editAEmployeeApi(id:any,reqBody:any){
    return this.http.put(`${this.serverUrl}/employee/${id}`,reqBody)
  }

  //get a particular employee
  getAEmployeeApi(id:any){
    return this.http.get(`${this.serverUrl}/employee/${id}`)
  }

  //api to update admin details

  updateAdminDetailsApi(body:any){
    return this.http.put(`${this.serverUrl}/employee/1`,body)
  }
}


