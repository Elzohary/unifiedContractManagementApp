import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SideMenuContentComponent } from './components/side-menu-content/side-menu-content.component';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-dashboard-employee',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    SideMenuContentComponent,
    RouterOutlet
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
