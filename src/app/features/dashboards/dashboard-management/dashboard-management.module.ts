import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { AllWorkOrdersComponent } from './components/all-work-orders/all-work-orders.component';
import { WorkOrderDetailsComponent } from './components/work-order-details/work-order-details.component';
import { ActivityLogPageComponent } from './components/activity-log-page/activity-log-page.component';
import { AllRemarksComponent } from './components/all-remarks/all-remarks.component';
import { OverviewComponent } from '../overview/overview.component';
import { UnderConstructionComponent } from '../../../shared/components/under-construction/under-construction.component';

const routes: Routes = [
  // Dashboard routes
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: OverviewComponent },
  { path: 'analytics', component: UnderConstructionComponent, data: { 
    title: 'Analytics Dashboard', 
    message: 'The analytics dashboard is currently under development.' 
  }},
  
  // Work Orders routes
  { path: 'all', component: AllWorkOrdersComponent },
  { path: 'details/:id', component: WorkOrderDetailsComponent },
  
  // Work Order Sections routes
  { path: 'remarks', component: AllRemarksComponent },
  { path: 'issues', component: UnderConstructionComponent, data: { 
    title: 'Work Order Issues', 
    message: 'The issues section is currently under development.' 
  }},
  { path: 'actions', component: UnderConstructionComponent, data: { 
    title: 'Work Order Actions', 
    message: 'The actions needed section is currently under development.' 
  }},
  { path: 'materials', component: UnderConstructionComponent, data: { 
    title: 'Work Order Materials', 
    message: 'The materials section is currently under development.' 
  }},
  { path: 'photos', component: UnderConstructionComponent, data: { 
    title: 'Work Order Photos', 
    message: 'The photos section is currently under development.' 
  }},
  { path: 'forms', component: UnderConstructionComponent, data: { 
    title: 'Work Order Forms', 
    message: 'The forms section is currently under development.' 
  }},
  { path: 'expenses', component: UnderConstructionComponent, data: { 
    title: 'Work Order Expenses', 
    message: 'The expenses section is currently under development.' 
  }},
  { path: 'invoices', component: UnderConstructionComponent, data: { 
    title: 'Work Order Invoices', 
    message: 'The invoices section is currently under development.' 
  }},
  
  // Activity routes
  { path: 'activity-log', component: ActivityLogPageComponent },
  { path: 'activity-dashboard', component: UnderConstructionComponent, data: { 
    title: 'Activity Dashboard', 
    message: 'The activity dashboard is currently under development.' 
  }},
  
  // Default route
  { path: '**', redirectTo: 'overview' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatTabsModule,
    // Import standalone components
    AllWorkOrdersComponent,
    WorkOrderDetailsComponent,
    ActivityLogPageComponent,
    AllRemarksComponent,
    OverviewComponent,
    UnderConstructionComponent
  ]
})
export class DashboardManagementModule { } 