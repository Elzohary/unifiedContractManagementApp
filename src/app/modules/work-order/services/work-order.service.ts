import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { StateService } from '../../../core/services/state.service';
import { WorkOrder, WorkOrderStatus, WorkOrderPriority } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private endpoint = 'work-orders';

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  getAllWorkOrders(): Observable<WorkOrder[]> {
    this.stateService.setLoading('workOrders', true);
    this.stateService.setError('workOrders', null);

    return this.apiService.get<WorkOrder[]>(this.endpoint).pipe(
      map(response => {
        this.stateService.updateWorkOrders(response.data);
        return response.data;
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

  getWorkOrderById(id: string): Observable<WorkOrder | null> {
    this.stateService.setLoading('workOrder', true);
    this.stateService.setError('workOrder', null);

    return this.apiService.get<WorkOrder>(`${this.endpoint}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('workOrder', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('workOrder', false);
      })
    );
  }

  createWorkOrder(workOrder: Partial<WorkOrder>): Observable<WorkOrder | null> {
    this.stateService.setLoading('workOrder', true);
    this.stateService.setError('workOrder', null);

    return this.apiService.post<WorkOrder>(this.endpoint, workOrder).pipe(
      map(response => {
        const newWorkOrder = response.data;
        const currentWorkOrders = this.stateService.workOrders$();
        this.stateService.updateWorkOrders([...currentWorkOrders, newWorkOrder]);
        return newWorkOrder;
      }),
      catchError(error => {
        this.stateService.setError('workOrder', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('workOrder', false);
      })
    );
  }

  updateWorkOrder(id: string, workOrder: Partial<WorkOrder>): Observable<WorkOrder | null> {
    this.stateService.setLoading('workOrder', true);
    this.stateService.setError('workOrder', null);

    return this.apiService.put<WorkOrder>(`${this.endpoint}/${id}`, workOrder).pipe(
      map(response => {
        const updatedWorkOrder = response.data;
        const currentWorkOrders = this.stateService.workOrders$();
        const updatedWorkOrders = currentWorkOrders.map(wo => 
          wo.id === id ? updatedWorkOrder : wo
        );
        this.stateService.updateWorkOrders(updatedWorkOrders);
        return updatedWorkOrder;
      }),
      catchError(error => {
        this.stateService.setError('workOrder', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('workOrder', false);
      })
    );
  }

  deleteWorkOrder(id: string): Observable<boolean> {
    this.stateService.setLoading('workOrder', true);
    this.stateService.setError('workOrder', null);

    return this.apiService.delete<WorkOrder>(`${this.endpoint}/${id}`).pipe(
      map(() => {
        const currentWorkOrders = this.stateService.workOrders$();
        const updatedWorkOrders = currentWorkOrders.filter(wo => wo.id !== id);
        this.stateService.updateWorkOrders(updatedWorkOrders);
        return true;
      }),
      catchError(error => {
        this.stateService.setError('workOrder', error.message);
        return of(false);
      }),
      finalize(() => {
        this.stateService.setLoading('workOrder', false);
      })
    );
  }

  updateWorkOrderStatus(id: string, status: WorkOrderStatus): Observable<WorkOrder | null> {
    return this.updateWorkOrder(id, { status });
  }

  updateWorkOrderPriority(id: string, priority: WorkOrderPriority): Observable<WorkOrder | null> {
    return this.updateWorkOrder(id, { priority });
  }

  assignWorkOrder(id: string, userIds: string[]): Observable<WorkOrder | null> {
    return this.updateWorkOrder(id, { assignedTo: userIds });
  }
} 