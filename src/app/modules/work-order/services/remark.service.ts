import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, finalize } from 'rxjs/operators';
import { ApiService } from '../../../core/services/api.service';
import { StateService } from '../../../core/services/state.service';
import { WorkOrderRemark } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class RemarkService {
  private endpoint = 'remarks';

  constructor(
    private apiService: ApiService,
    private stateService: StateService
  ) {}

  getAllRemarks(): Observable<WorkOrderRemark[]> {
    this.stateService.setLoading('remarks', true);
    this.stateService.setError('remarks', null);

    return this.apiService.get<WorkOrderRemark[]>(this.endpoint).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('remarks', error.message);
        return of([]);
      }),
      finalize(() => {
        this.stateService.setLoading('remarks', false);
      })
    );
  }

  getRemarkById(id: string): Observable<WorkOrderRemark | null> {
    this.stateService.setLoading('remark', true);
    this.stateService.setError('remark', null);

    return this.apiService.get<WorkOrderRemark>(`${this.endpoint}/${id}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('remark', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('remark', false);
      })
    );
  }

  getRemarksByWorkOrderId(workOrderId: string): Observable<WorkOrderRemark[]> {
    this.stateService.setLoading('remarks', true);
    this.stateService.setError('remarks', null);

    return this.apiService.get<WorkOrderRemark[]>(`${this.endpoint}/work-order/${workOrderId}`).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('remarks', error.message);
        return of([]);
      }),
      finalize(() => {
        this.stateService.setLoading('remarks', false);
      })
    );
  }

  addRemark(remark: Partial<WorkOrderRemark>): Observable<WorkOrderRemark | null> {
    this.stateService.setLoading('remark', true);
    this.stateService.setError('remark', null);

    return this.apiService.post<WorkOrderRemark>(this.endpoint, remark).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('remark', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('remark', false);
      })
    );
  }

  updateRemark(id: string, remarkData: Partial<WorkOrderRemark>): Observable<WorkOrderRemark | null> {
    this.stateService.setLoading('remark', true);
    this.stateService.setError('remark', null);

    return this.apiService.put<WorkOrderRemark>(`${this.endpoint}/${id}`, remarkData).pipe(
      map(response => response.data),
      catchError(error => {
        this.stateService.setError('remark', error.message);
        return of(null);
      }),
      finalize(() => {
        this.stateService.setLoading('remark', false);
      })
    );
  }

  deleteRemark(id: string): Observable<boolean> {
    this.stateService.setLoading('remark', true);
    this.stateService.setError('remark', null);

    return this.apiService.delete<WorkOrderRemark>(`${this.endpoint}/${id}`).pipe(
      map(() => true),
      catchError(error => {
        this.stateService.setError('remark', error.message);
        return of(false);
      }),
      finalize(() => {
        this.stateService.setLoading('remark', false);
      })
    );
  }
} 