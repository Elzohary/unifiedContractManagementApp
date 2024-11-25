import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuContentComponent } from './components/side-menu-content/side-menu-content.component';
import { RouterOutlet } from '@angular/router';
import { HeaderDashboardManagementComponent } from './layouts/header-dashboard-management/header-dashboard-management.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDivider } from '@angular/material/divider';




@Component({
  selector: 'app-dashboard-employee',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SideMenuContentComponent,
    RouterOutlet,
    HeaderDashboardManagementComponent,
    MatGridListModule,
    MatDivider
  ],
  templateUrl: './dashboard-employee.component.html',
  styleUrl: './dashboard-employee.component.scss'
})
export class DashboardEmployeeComponent {
  isDrawerOpen = signal(true);

  sideMenuToggle () {
    this.isDrawerOpen.set(!this.isDrawerOpen());
    console.log(this.isDrawerOpen());
  }

}
