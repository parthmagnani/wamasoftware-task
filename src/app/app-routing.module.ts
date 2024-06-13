import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [

      {
        path: '',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      
      { 
        path: 'employee', 
        loadChildren: () => import('./features/employee/employee.module').then(m => m.EmployeeModule) 
      },

      { 
        path: 'policy', 
        loadChildren: () => import('./features/policy/policy.module').then(m => m.PolicyModule) 
      }
      
    ]
  },
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
