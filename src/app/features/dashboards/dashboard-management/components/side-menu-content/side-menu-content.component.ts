import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { projectMenuItems } from '../../models/menu-items';

@Component({
  selector: 'app-side-menu-content',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatChipsModule,
    DragDropModule,
    RouterLinkActive,
    RouterModule
  ],
  templateUrl: './side-menu-content.component.html',
  styleUrl: './side-menu-content.component.scss'
})
export class SideMenuContentComponent {
  projectMenu = projectMenuItems;
}
