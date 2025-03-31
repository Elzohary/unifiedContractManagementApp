import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WorkOrderService } from '../../../../../shared/services/work-order.service';
import { Router, RouterModule } from '@angular/router';
import { WorkOrder } from '../../../../../shared/models/work-order.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-work-orders',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule,
    MatCardModule,
    MatProgressSpinnerModule,
    RouterModule
  ],
  templateUrl: './all-work-orders.component.html',
  styleUrl: './all-work-orders.component.scss'
})
export class AllWorkOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['orderNumber', 'title', 'client', 'priority', 'status', 'completionPercentage', 'actions'];
  dataSource = new MatTableDataSource<WorkOrder>([]);
  loading = true;
  workOrders: WorkOrder[] = [];
  statusFilter = '';
  currentPath = '';
  pageTitle = 'Work Orders';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private workOrderService: WorkOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.currentPath = this.router.url;
    this.updatePageTitle();
    this.loadWorkOrders();
  }

  updatePageTitle() {
    if (this.currentPath.includes('/work-orders/in-progress')) {
      this.pageTitle = 'In Progress Work Orders';
      this.statusFilter = 'in-progress';
    } else if (this.currentPath.includes('/work-orders/pending')) {
      this.pageTitle = 'Pending Work Orders';
      this.statusFilter = 'pending';
    } else if (this.currentPath.includes('/work-orders/completed')) {
      this.pageTitle = 'Completed Work Orders';
      this.statusFilter = 'completed';
    } else {
      this.pageTitle = 'All Work Orders';
      this.statusFilter = '';
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadWorkOrders() {
    this.loading = true;
    
    // Determine which work orders to load based on the current route
    if (this.currentPath.includes('/work-orders/in-progress')) {
      this.workOrderService.getWorkOrdersByStatus('in-progress').subscribe(data => {
        this.workOrders = data;
        this.dataSource.data = data;
        this.loading = false;
      });
    } else if (this.currentPath.includes('/work-orders/pending')) {
      this.workOrderService.getWorkOrdersByStatus('pending').subscribe(data => {
        this.workOrders = data;
        this.dataSource.data = data;
        this.loading = false;
      });
    } else if (this.currentPath.includes('/work-orders/completed')) {
      this.workOrderService.getWorkOrdersByStatus('completed').subscribe(data => {
        this.workOrders = data;
        this.dataSource.data = data;
        this.loading = false;
      });
    } else {
      // All work orders
      this.workOrderService.getWorkOrders().subscribe(data => {
        this.workOrders = data;
        this.dataSource.data = data;
        this.loading = false;
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterByStatus(status: string) {
    if (status === '') {
      this.dataSource.data = this.workOrders;
    } else {
      this.dataSource.data = this.workOrders.filter(wo => wo.status === status);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'in-progress':
        return 'status-in-progress';
      case 'completed':
        return 'status-completed';
      case 'pending':
        return 'status-pending';
      case 'draft':
        return 'status-draft';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'urgent':
        return 'priority-urgent';
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  }

  viewWorkOrder(id: string) {
    this.router.navigate(['/work-orders/details', id]);
  }

  createNewWorkOrder() {
    this.router.navigate(['/work-orders/new']);
  }
}
