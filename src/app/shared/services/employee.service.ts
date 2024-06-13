import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../utils/api-url';
import { Employee } from 'src/app/models/employee.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  getEmployeeList(){
    // return this.http.get(API_URL + 'employees')
    return this.http.get(API_URL).pipe(
      map((employees: any) => employees.sort((a: any, b: any) => b.timeStamp - a.timeStamp))  // Sort by `id` in descending order
    );

    
  }

  addEmployee(employee: Employee) {
    return this.http.post(API_URL, employee);
  }

  getEmployeeById(id: string) {
    return this.http.get(`${API_URL}/${id}`);
  }

  deleteEmployee(id: string){
    return this.http.delete(`${API_URL}/${id}`);
    // return this.http.delete(`${API_URL}/${id}`);
  }

  updateEmployee(id: string, employee: Employee) {
    return this.http.put(`${API_URL}/${id}`, employee);
  }
}
