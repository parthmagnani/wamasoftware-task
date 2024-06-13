import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { ConfirmDialogComponent } from 'src/app/shared/dialogs/confirm-dialog/confirm-dialog.component';
import { EmployeeDetailComponent } from 'src/app/shared/dialogs/employee-detail/employee-detail.component';
import { EmployeeService } from 'src/app/shared/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})


export class EmployeeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'salary', 'age', 'action'];
  employeeList!: Employee[]
  debounceTimeout: any;

  constructor(
    private _employeeService: EmployeeService,
    private _matDialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {

  }


  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList() {
    this._employeeService.getEmployeeList().subscribe((resposne: any) => {
      console.log("THis is resposne", resposne)
      if (resposne.length) {
        this.employeeList = resposne
      }
    }, error => {
      console.log("error", error)
      // this._snackBar.open('Something went Wrong', 'Okay', {duration: 3000})
    })
  }

  onDeleteEmployee(event: any, employee: Employee) {
    event.stopPropagation()
    console.log("employee -->>", employee)

    this._matDialog.open(ConfirmDialogComponent, {
      autoFocus: false,

    }).afterClosed().subscribe((response: boolean) => {
      console.log(response)
      if (response) {
        this._employeeService.deleteEmployee(employee?.id).subscribe((resposne: any) => {
          this.employeeList = this.employeeList.filter((emp: Employee) => emp.id !== employee.id);
          this._snackBar.open('Employee Deleted Successfully', 'Okay', { duration: 3000 })

        })
      }
    })
  }

  onEditEmployee(event: any,employee: Employee) {
    event.stopPropagation()
    this.router.navigate([`/employee/add-edit-employee/${employee.id}`])
  }

  showEmployeeDetails(employee: Employee) {
    console.log("Send this data to dialog", employee)
    this._matDialog.open(EmployeeDetailComponent, {
      autoFocus: false,
      data: {
        employeeDetail: employee
      }
    })
  }

  onInput(event: any) {
    const searchValue = event.target.value;
    this.debounce(() => this.onSearchEmployee(searchValue), 300);
  }

  onSearchEmployee(searchValue: string) {

    if (!searchValue) {
      this.getEmployeeList()
    } else {
      this.employeeList = this.employeeList.filter(employee =>
        employee.employee_name.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
  }

  debounce(func: () => void, wait: number) {
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(func, wait);
  }
}
