import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { StateService } from '../../../core/services/state.service';
import { WorkOrder, WorkOrderRemark } from '../../../shared/models/work-order.model';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private readonly endpoint = 'work-orders';

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  // Get all work orders
  getWorkOrders(): Observable<WorkOrder[]> {
    this.stateService.setLoading('workOrders', true);
    
    return this.apiService.get<WorkOrder[]>(this.endpoint).pipe(
      map(response => {
        const workOrders = response.data;
        this.stateService.updateWorkOrders(workOrders);
        return workOrders;
      }),
      catchError(error => {
        this.stateService.setError('workOrders', error.message);
        return of([]);
      }),
      finalize(() => {
        this.stateService.setLoading('workOrders', false);
      })
    );
  }

  // Get work order by ID
  getWorkOrderById(id: string): Observable<WorkOrder | null> {
    this.stateService.setLoading(`workOrder-${id}`, true);
    
    return this.apiService.get<WorkOrder>(`${this.endpoint}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError(`workOrder-${id}`, error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading(`workOrder-${id}`, false);
      })
    );
  }

  // Create work order
  createWorkOrder(workOrder: Partial<WorkOrder>): Observable<WorkOrder | null> {
    this.stateService.setLoading('createWorkOrder', true);
    
    return this.apiService.post<WorkOrder>(this.endpoint, workOrder).pipe(
      map(response => {
        const newWorkOrder = response.data;
        // Update local state
        const currentWorkOrders = this.stateService.workOrders$();
        this.stateService.updateWorkOrders([...currentWorkOrders, newWorkOrder]);
        return newWorkOrder;
      }),
      catchError(error => {
        this.stateService.setError('createWorkOrder', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('createWorkOrder', false);
      })
    );
  }

  // Update work order
  updateWorkOrder(id: string, workOrder: Partial<WorkOrder>): Observable<WorkOrder | null> {
    this.stateService.setLoading(`updateWorkOrder-${id}`, true);
    
    return this.apiService.put<WorkOrder>(`${this.endpoint}/${id}`, workOrder).pipe(
      map(response => {
        const updatedWorkOrder = response.data;
        // Update local state
        const currentWorkOrders = this.stateService.workOrders$();
        const updatedWorkOrders = currentWorkOrders.map(wo => 
          wo.id === id ? updatedWorkOrder : wo
        );
        this.stateService.updateWorkOrders(updatedWorkOrders);
        return updatedWorkOrder;
      }),
      catchError(error => {
        this.stateService.setError(`updateWorkOrder-${id}`, error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading(`updateWorkOrder-${id}`, false);
      })
    );
  }

  // Delete work order
  deleteWorkOrder(id: string): Observable<boolean> {
    this.stateService.setLoading(`deleteWorkOrder-${id}`, true);
    
    return this.apiService.delete<boolean>(`${this.endpoint}/${id}`).pipe(
      map(response => {
        if (response.data) {
          // Update local state
          const currentWorkOrders = this.stateService.workOrders$();
          const updatedWorkOrders = currentWorkOrders.filter(wo => wo.id !== id);
          this.stateService.updateWorkOrders(updatedWorkOrders);
        }
        return response.data;
      }),
      catchError(error => {
        this.stateService.setError(`deleteWorkOrder-${id}`, error.message);
        return of(false);
      }),
      finalize(() => {
        this.stateService.setLoading(`deleteWorkOrder-${id}`, false);
      })
    );
  }

  // Get remarks for work order
  getRemarksForWorkOrder(workOrderId: string): Observable<WorkOrderRemark[]> {
    this.stateService.setLoading(`remarks-${workOrderId}`, true);
    
    return this.apiService.get<WorkOrderRemark[]>(`${this.endpoint}/${workOrderId}/remarks`).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError(`remarks-${workOrderId}`, error.message);
        return of([]);
      }),
      finalize(() => {
        this.stateService.setLoading(`remarks-${workOrderId}`, false);
      })
    );
  }
} 