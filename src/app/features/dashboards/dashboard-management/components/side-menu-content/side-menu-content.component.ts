import { Component } from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import { MatDivider } from '@angular/material/divider';
import {MatTabsModule} from '@angular/material/tabs';
import { projectMenuItems } from '../../models/menu-items';
import { RouterLinkActive, RouterModule } from '@angular/router';



@Component({
  selector: 'app-side-menu-content',
  imports: [
    MatChipsModule,
    MatDivider,
    MatTabsModule,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './side-menu-content.component.html',
  styleUrl: './side-menu-content.component.scss'
})
export class SideMenuContentComponent {

  projectMenu = projectMenuItems;

}
