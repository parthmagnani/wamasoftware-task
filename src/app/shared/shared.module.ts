import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';
import { EmployeeDetailComponent } from './dialogs/employee-detail/employee-detail.component';



@NgModule({
  declarations: [
    ConfirmDialogComponent,
    EmployeeDetailComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class SharedModule { }
