import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AllWorkOrdersTableService } from '../../services/all-work-orders-table.service';
import {MatButtonModule} from '@angular/material/button';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-work-orders',
  imports: [
    MatFormField,
    MatFormFieldModule,
    MatInputModule,
    MatLabel,
    MatTableModule,
    MatPaginator,
    MatButtonModule,
    RouterModule
    ],
  templateUrl: './all-work-orders.component.html',
  styleUrl: './all-work-orders.component.scss'
})
export class AllWorkOrdersComponent implements AfterViewInit {

  displayedColumns: string[] = ['wo-id', 'wo-location', 'wo-type', 'wo-status'];
  toggleValue = '';
  dataSource :any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor (private workOrders : AllWorkOrdersTableService) {
    this.dataSource = new MatTableDataSource(this.workOrders.getAllWorkOrders());
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  all() {
    if(this.toggleValue == 'Completed') {
      this.dataSource.filter = 'Completed';
      console.log(this.toggleValue);
    }
    else if(this.toggleValue == 'all') {
      this.dataSource.filter = '';
    }
    else if(this.toggleValue == 'In Progress') {
      this.dataSource.filter = 'In Progress';
    }
  }

}
