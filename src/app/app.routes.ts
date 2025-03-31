import { WOComponent } from './features/dashboards/dashboard-management/components/wo/wo.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardEmployeeComponent } from './features/dashboards/dashboard-management/dashboard-employee.component';
import { AllWorkOrdersComponent } from './features/dashboards/dashboard-management/components/all-work-orders/all-work-orders.component';
import { WorkOrderDetailsComponent } from './features/dashboards/dashboard-management/components/work-order-details/work-order-details.component';
import { WorkOrderFormComponent } from './features/dashboards/dashboard-management/components/work-order-form/work-order-form.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { 
      path: 'dashboard', 
      component: DashboardEmployeeComponent, 
      children: [
        { path: '', redirectTo: 'overview', pathMatch: 'full' },
        { path: 'overview', component: AllWorkOrdersComponent },
        { path: 'analytics', component: AllWorkOrdersComponent } // Placeholder for Analytics
      ]
    },
    { 
      path: 'work-orders', 
      component: DashboardEmployeeComponent, 
      children: [
        { path: '', redirectTo: 'all', pathMatch: 'full' },
        { path: 'all', component: AllWorkOrdersComponent },
        { path: 'new', component: WorkOrderFormComponent },
        { path: 'edit/:id', component: WorkOrderFormComponent },
        { path: 'details/:id', component: WorkOrderDetailsComponent },
        { path: 'in-progress', component: AllWorkOrdersComponent },
        { path: 'pending', component: AllWorkOrdersComponent },
        { path: 'completed', component: AllWorkOrdersComponent }
      ]
    },
    { 
      path: 'resources', 
      component: DashboardEmployeeComponent, 
      children: [
        { path: 'manpower', component: AllWorkOrdersComponent }, // Placeholder for Manpower
        { path: 'equipment', component: AllWorkOrdersComponent }, // Placeholder for Equipment
        { path: 'materials', component: AllWorkOrdersComponent } // Placeholder for Materials
      ]
    },
    {
      path: 'hr',
      component: DashboardEmployeeComponent,
      loadChildren: () => import('./features/hr/hr.module').then(m => m.HrModule)
    },
    { 
      path: 'reports', 
      component: DashboardEmployeeComponent, 
      children: [
        { path: 'monthly', component: AllWorkOrdersComponent }, // Placeholder for Monthly Reports
        { path: 'performance', component: AllWorkOrdersComponent }, // Placeholder for Performance Reports
        { path: 'custom', component: AllWorkOrdersComponent } // Placeholder for Custom Reports
      ]
    },
    { 
      path: 'admin', 
      component: DashboardEmployeeComponent, 
      children: [
        { path: 'users', component: AllWorkOrdersComponent }, // Placeholder for Users
        { path: 'settings', component: AllWorkOrdersComponent } // Placeholder for Settings
      ]
    },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
]; 