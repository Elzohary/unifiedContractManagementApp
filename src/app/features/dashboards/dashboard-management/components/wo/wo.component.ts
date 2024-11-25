import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BreadcrumbComponent } from '../../../../../shared/components/breadcrumb/breadcrumb.component';
import { ExpansionPanelComponent } from '../../../../../shared/components/expansion-panel/expansion-panel.component';
import { NgCardComponent } from '../../../../../shared/components/ng-card/ng-card.component';
import { NgTableComponent } from '../../../../../shared/components/ng-table/ng-table.component';
import { BarChartComponent } from '../../../../../shared/components/bar-chart/bar-chart.component';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-wo',
  imports: [
    MatCardModule,
    BreadcrumbComponent,
    ExpansionPanelComponent,
    NgCardComponent,
    NgTableComponent,
    BarChartComponent,
    MatButtonModule
  ],
  templateUrl: './wo.component.html',
  styleUrl: './wo.component.scss'
})
export class WOComponent {

}
