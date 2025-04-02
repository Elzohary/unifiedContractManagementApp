import { WOComponent } from './features/dashboards/dashboard-management/components/wo/wo.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AllWorkOrdersComponent } from './features/dashboards/dashboard-management/components/all-work-orders/all-work-orders.component';
import { WorkOrderDetailsComponent } from './features/dashboards/dashboard-management/components/work-order-details/work-order-details.component';
import { WorkOrderFormComponent } from './features/dashboards/dashboard-management/components/work-order-form/work-order-form.component';
import { OverviewComponent } from './features/dashboards/overview/overview.component';
import { UnderConstructionComponent } from './shared/components/under-construction/under-construction.component';
import { AllRemarksComponent } from './features/dashboards/dashboard-management/components/all-remarks/all-remarks.component';
import { ActivityLogPageComponent } from './features/dashboards/dashboard-management/components/activity-log-page/activity-log-page.component';
import { EquipmentDashboardComponent } from './modules/resources/components/equipment-dashboard/equipment-dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    
    // Dashboard routes
    { path: 'dashboard', redirectTo: 'dashboard/overview', pathMatch: 'full' },
    { path: 'dashboard/overview', component: OverviewComponent },
    { path: 'dashboard/analytics', component: UnderConstructionComponent, data: { title: 'Analytics Dashboard', message: 'The analytics dashboard is currently under development.' } },

    // Work orders routes 
    { path: 'work-orders', redirectTo: 'work-orders/all', pathMatch: 'full' },
    { path: 'work-orders/all', component: AllWorkOrdersComponent },
    { path: 'work-orders/new', component: WorkOrderFormComponent },
    { path: 'work-orders/edit/:id', component: WorkOrderFormComponent },
    
    // Work order details with ID parameter
    { path: 'work-orders/details/:id', component: WorkOrderDetailsComponent },
    
    // Separate routes for work order sections
    { path: 'work-order-sections/remarks', component: AllRemarksComponent },
    { path: 'work-order-sections/activity-log', component: ActivityLogPageComponent },
    { path: 'work-order-sections/issues', component: UnderConstructionComponent, data: { 
        title: 'Work Order Issues', 
        message: 'The issues section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/actions', component: UnderConstructionComponent, data: { 
        title: 'Work Order Actions', 
        message: 'The actions needed section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/materials', component: UnderConstructionComponent, data: { 
        title: 'Work Order Materials', 
        message: 'The materials section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/photos', component: UnderConstructionComponent, data: { 
        title: 'Work Order Photos', 
        message: 'The photos section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/forms', component: UnderConstructionComponent, data: { 
        title: 'Work Order Forms', 
        message: 'The forms section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/expenses', component: UnderConstructionComponent, data: { 
        title: 'Work Order Expenses', 
        message: 'The expenses section is currently under development.',
        category: 'work-orders'
    }},
    { path: 'work-order-sections/invoices', component: UnderConstructionComponent, data: { 
        title: 'Work Order Invoices', 
        message: 'The invoices section is currently under development.',
        category: 'work-orders'
    }},

    // Resources routes
    { path: 'resources', redirectTo: 'resources/manpower', pathMatch: 'full' },
    { path: 'resources/manpower', component: UnderConstructionComponent, data: { title: 'Manpower Management', message: 'The manpower management page is currently under development.' } },
    { path: 'resources/equipment', component: EquipmentDashboardComponent },
    { path: 'resources/materials', component: UnderConstructionComponent, data: { title: 'Materials Management', message: 'The materials management page is currently under development.' } },

    // HR routes
    { path: 'hr', redirectTo: 'hr/dashboard', pathMatch: 'full' },
    { path: 'hr/dashboard', loadComponent: () => import('./features/hr/hr-dashboard/hr-dashboard.component').then(c => c.HrDashboardComponent) },
    { path: 'hr/employees', loadComponent: () => import('./features/hr/employee/employee-list/employee-list.component').then(c => c.EmployeeListComponent) },
    { path: 'hr/employees/new', loadComponent: () => import('./features/hr/employee/employee-form/employee-form.component').then(c => c.EmployeeFormComponent) },
    { path: 'hr/employees/:id', loadComponent: () => import('./features/hr/employee/employee-detail/employee-detail.component').then(c => c.EmployeeDetailComponent) },
    { path: 'hr/employees/:id/edit', loadComponent: () => import('./features/hr/employee/employee-form/employee-form.component').then(c => c.EmployeeFormComponent) },
    { path: 'hr/employees/:id/requests', loadComponent: () => import('./features/hr/requests/employee-requests/employee-requests.component').then(c => c.EmployeeRequestsComponent) },
    { path: 'hr/employees/:id/attendance', loadComponent: () => import('./features/hr/attendance/attendance-management/attendance-management.component').then(c => c.AttendanceManagementComponent) },
    { path: 'hr/requests', loadComponent: () => import('./features/hr/requests/employee-requests/employee-requests.component').then(c => c.EmployeeRequestsComponent) },
    { path: 'hr/attendance', loadComponent: () => import('./features/hr/attendance/attendance-management/attendance-management.component').then(c => c.AttendanceManagementComponent) },
    { path: 'hr/warnings', loadComponent: () => import('./features/hr/hr-dashboard/hr-dashboard.component').then(c => c.HrDashboardComponent), data: { tempRoute: true, message: 'Employee Warnings - Coming Soon' } },
    { path: 'hr/announcements', loadComponent: () => import('./features/hr/hr-dashboard/hr-dashboard.component').then(c => c.HrDashboardComponent), data: { tempRoute: true, message: 'HR Announcements - Coming Soon' } },
    { path: 'hr/reports', loadComponent: () => import('./features/hr/hr-dashboard/hr-dashboard.component').then(c => c.HrDashboardComponent), data: { tempRoute: true, message: 'HR Reports - Coming Soon' } },

    // Reports routes
    { path: 'reports', redirectTo: 'reports/monthly', pathMatch: 'full' },
    { path: 'reports/monthly', component: UnderConstructionComponent, data: { title: 'Monthly Reports', message: 'The monthly reports page is currently under development.' } },
    { path: 'reports/performance', component: UnderConstructionComponent, data: { title: 'Performance Reports', message: 'The performance reports page is currently under development.' } },
    { path: 'reports/custom', component: UnderConstructionComponent, data: { title: 'Custom Reports', message: 'The custom reports page is currently under development.' } },

    // Admin routes
    { path: 'admin', redirectTo: 'admin/users', pathMatch: 'full' },
    { path: 'admin/users', component: UnderConstructionComponent, data: { title: 'User Management', message: 'The user management page is currently under development.' } },
    { path: 'admin/settings', component: UnderConstructionComponent, data: { title: 'System Settings', message: 'The system settings page is currently under development.' } },
    
    // Activity Log direct route
    { path: 'activity-log', component: ActivityLogPageComponent },
    
    // Activity Dashboard
    { path: 'activity-dashboard', loadComponent: () => import('./features/activity-dashboard/activity-dashboard.component').then(c => c.ActivityDashboardComponent) },
    
    // Default route
    { path: '', redirectTo: 'dashboard/overview', pathMatch: 'full' }
]; 