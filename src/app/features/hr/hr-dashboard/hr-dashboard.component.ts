import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { DataRepositoryService } from '../../../core/services/data-repository.service';
import { Employee, Announcement } from '../../../core/models/employee.model';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './hr-dashboard.component.html',
  styleUrls: ['./hr-dashboard.component.scss']
})
export class HrDashboardComponent implements OnInit, OnDestroy {
  employees$: Observable<Employee[]>;
  announcements$: Observable<Announcement[]>;
  isLoading$: Observable<boolean>;
  currentUser: Employee | null = null;
  private destroy$ = new Subject<void>();

  // Sample KPI data
  kpiData = [
    { title: 'Total Employees', value: 0, icon: 'people', color: 'primary' },
    { title: 'Pending Requests', value: 0, icon: 'assignment', color: 'accent' },
    { title: 'Warnings Issued', value: 0, icon: 'warning', color: 'warn' },
    { title: 'Attendance Rate', value: 0, suffix: '%', icon: 'access_time', color: 'primary' },
    { title: 'On-Time Rate', value: 0, suffix: '%', icon: 'alarm_on', color: 'accent' },
    { title: 'Sick Leaves', value: 0, icon: 'healing', color: 'warn' }
  ];

  constructor(
    private dataRepository: DataRepositoryService,
    private router: Router
  ) {
    // Initialize loading state and setup observables
    this.isLoading$ = this.dataRepository.dataLoading$;
    this.employees$ = this.dataRepository.getEmployees();
    this.announcements$ = this.dataRepository.getActiveAnnouncements();
  }

  ngOnInit(): void {
    // Calculate KPIs when employees are loaded
    this.employees$
      .pipe(takeUntil(this.destroy$))
      .subscribe(employees => {
        // Update KPI data
        this.kpiData[0].value = employees.length;
        
        // Calculate attendance rates
        let totalAttendance = 0;
        let totalOnTime = 0;
        let totalSickLeaves = 0;
        let pendingRequestsCount = 0;
        let warningsCount = 0;

        employees.forEach(employee => {
          totalSickLeaves += employee.sickLeaveCounter || 0;
          
          // Process attendance records
          if (employee.attendance && employee.attendance.length > 0) {
            totalAttendance += employee.attendance.length;
            const onTimeRecords = employee.attendance.filter(record => 
              record.status === 'present' && !record.lateMinutes);
            totalOnTime += onTimeRecords.length;
          }
          
          // Count pending requests
          if (employee.sentRequests) {
            const pending = employee.sentRequests.filter(req => req.status === 'pending');
            pendingRequestsCount += pending.length;
          }
          
          // Count warnings
          if (employee.warnings) {
            warningsCount += employee.warnings.length;
          }
        });

        // Calculate rates
        const attendanceRate = employees.length > 0 ? 
          (totalAttendance / (employees.length * 10)) * 100 : 0; // Assuming 10 working days
        const onTimeRate = totalAttendance > 0 ? 
          (totalOnTime / totalAttendance) * 100 : 0;

        // Update KPI data 
        this.kpiData[1].value = pendingRequestsCount;
        this.kpiData[2].value = warningsCount;
        this.kpiData[3].value = Math.round(attendanceRate);
        this.kpiData[4].value = Math.round(onTimeRate);
        this.kpiData[5].value = totalSickLeaves;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
} 