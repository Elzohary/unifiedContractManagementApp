import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardEmployeeComponent } from './features/dashboards/dashboard-management/dashboard-employee.component';
import { AllWorkOrdersComponent } from './features/dashboards/dashboard-management/components/all-work-orders/all-work-orders.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'dashboard', component: DashboardEmployeeComponent, children: [
      { path: 'all-work-orders', component: AllWorkOrdersComponent, pathMatch: 'full' }
    ]},

    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
