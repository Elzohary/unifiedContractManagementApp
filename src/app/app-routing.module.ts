import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'work-orders',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'work-order-sections',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'activity-log',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'activity-dashboard',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'resources',
    loadChildren: () => import('./modules/resources/resources.module')
      .then(m => m.ResourcesModule)
  },
  {
    path: 'hr',
    loadChildren: () => import('./features/hr/hr.module')
      .then(m => m.HrModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/dashboards/dashboard-management/dashboard-management.module')
      .then(m => m.DashboardManagementModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 