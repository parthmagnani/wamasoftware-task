import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent implements OnInit {

  employeeForm!: FormGroup
  employeeId: string = ''
  employeeDetails!: Employee

  constructor(
    private fb: FormBuilder,
    private _employeeService: EmployeeService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private activateRoute: ActivatedRoute
  ){
    this.activateRoute.params.subscribe((params: any) => {
      console.log("This is params", params)
      this.employeeId = params.id
    })
  }

  ngOnInit(): void {
    this.createForm()
    if(this.employeeId){
      this.getEmployeeDetails()
    }
      
  }

  createForm(data?: any){
    this.employeeForm = this.fb.group({
      employee_name: [data ? data.employee_name : '', Validators.required],
      employee_salary: [data ? data.employee_salary : '', Validators.required],
      employee_age: [data ? data.employee_age : '', Validators.required]
    })
  }

  getEmployeeDetails(){
    this._employeeService.getEmployeeById(this.employeeId).subscribe((response: any) => {
      console.log("This is response", response)
      this.employeeDetails = response
      this.createForm(response)
      
    })
  }

  onFormSubmit(){
    console.log("This is form value", this.employeeForm.value)
    if(this.employeeId){
      // edit form
      const payload = {
        ...this.employeeDetails,
        employee_name: this.employeeForm.value.employee_name,
        employee_salary: this.employeeForm.value.employee_salary,
        employee_age: this.employeeForm.value.employee_age,
      }

      console.log("This is payload", payload)

      this._employeeService.updateEmployee(this.employeeId, payload).subscribe((response: any) => {
        this._snackBar.open('Employee Updated Successfully', 'Okay', { duration: 3000 });
        this.router.navigate(['/employee']);
      });
    }else{
      const payload = {...this.employeeForm.value, timeStamp: new Date().getTime()}
      console.log("latest payload", payload)
      this._employeeService.addEmployee(payload).subscribe((response: any) => {
        console.log("This is reponse", response)
        this._snackBar.open('Employee Added Successfully', 'Okay', {duration: 3000})
        this.router.navigate(['/employee'])
      })
    }
    

  }
}
