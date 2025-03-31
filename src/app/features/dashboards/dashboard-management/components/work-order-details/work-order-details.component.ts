import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkOrderService } from '../../../../../shared/services/work-order.service';
import { WorkOrder } from '../../../../../shared/models/work-order.model';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-work-order-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    RouterModule
  ],
  templateUrl: './work-order-details.component.html',
  styleUrl: './work-order-details.component.scss'
})
export class WorkOrderDetailsComponent implements OnInit {
  workOrder: WorkOrder | null = null;
  loading = true;
  error = false;
  errorMessage = 'Unable to load work order details.';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private workOrderService: WorkOrderService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.loadWorkOrder(id);
      } else {
        this.setError('Work order ID is missing.');
        this.loading = false;
      }
    });
  }

  loadWorkOrder(id: string): void {
    this.loading = true;
    this.error = false;
    
    this.workOrderService.getWorkOrderById(id)
      .pipe(
        catchError(err => {
          this.setError(`Error loading work order: ${err.message || 'Unknown error'}`);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(workOrder => {
        if (workOrder) {
          this.workOrder = workOrder;
          
          // Add default value for issues if not present
          if (!this.workOrder.issues) {
            this.workOrder.issues = [];
          }
        } else if (!this.error) {
          this.setError('Work order not found.');
        }
      });
  }

  private setError(message: string): void {
    this.error = true;
    this.errorMessage = message;
    console.error(message);
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

  formatDate(date: string | Date): string {
    if (!date) return 'Not specified';
    
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  goBack(): void {
    this.router.navigate(['/work-orders']);
  }

  editWorkOrder(): void {
    if (this.workOrder) {
      this.router.navigate(['/work-orders/edit', this.workOrder.id]);
    }
  }
} 