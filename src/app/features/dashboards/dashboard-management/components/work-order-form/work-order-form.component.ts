import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { WorkOrderService } from '../../../../../shared/services/work-order.service';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { WorkOrder, Task, Material, Manpower, Note } from '../../../../../shared/models/work-order.model';

@Component({
  selector: 'app-work-order-form',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDividerModule,
    MatListModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './work-order-form.component.html',
  styleUrl: './work-order-form.component.scss'
})
export class WorkOrderFormComponent implements OnInit {
  workOrderForm!: FormGroup;
  isEditMode = false;
  loading = false;
  saving = false;
  workOrderId = '';
  
  priorities = ['low', 'medium', 'high', 'urgent'];
  statuses = ['draft', 'pending', 'in-progress', 'completed', 'cancelled'];
  categories = [
    'Residential Construction',
    'Commercial Construction',
    'Renovation',
    'Plumbing',
    'Electrical',
    'HVAC',
    'Roofing',
    'Flooring',
    'Landscaping',
    'Painting',
    'Demolition',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private workOrderService: WorkOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.workOrderId = id;
        this.loadWorkOrder(id);
      }
    });
  }

  private initForm(): void {
    this.workOrderForm = this.fb.group({
      orderNumber: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      client: this.fb.group({
        name: ['', Validators.required],
        contactEmail: ['', [Validators.required, Validators.email]],
        contactPhone: ['', Validators.required],
        contactPerson: ['']
      }),
      siteLocation: ['', Validators.required],
      category: ['', Validators.required],
      priority: ['medium', Validators.required],
      status: ['draft', Validators.required],
      estimatedCost: [0, [Validators.required, Validators.min(0)]],
      completionPercentage: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
      startDate: [new Date(), Validators.required],
      targetEndDate: [new Date(new Date().setMonth(new Date().getMonth() + 1)), Validators.required],
      tasks: this.fb.array([]),
      materials: this.fb.array([]),
      manpower: this.fb.array([]),
      notes: this.fb.array([])
    });
  }

  loadWorkOrder(id: string): void {
    this.loading = true;
    this.workOrderService.getWorkOrderById(id).subscribe({
      next: (workOrder) => {
        if (workOrder) {
          this.populateForm(workOrder);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading work order:', err);
        this.loading = false;
      }
    });
  }

  populateForm(workOrder: WorkOrder): void {
    // Reset form arrays first
    this.tasksFormArray.clear();
    this.materialsFormArray.clear();
    this.manpowerFormArray.clear();
    this.notesFormArray.clear();
    
    // Add tasks
    if (workOrder.tasks && workOrder.tasks.length > 0) {
      workOrder.tasks.forEach(task => {
        this.tasksFormArray.push(
          this.fb.group({
            name: [task.name, Validators.required],
            description: [task.description],
            status: [task.status]
          })
        );
      });
    }
    
    // Add materials
    if (workOrder.materials && workOrder.materials.length > 0) {
      workOrder.materials.forEach(material => {
        this.materialsFormArray.push(
          this.fb.group({
            name: [material.name, Validators.required],
            quantity: [material.quantity, [Validators.required, Validators.min(1)]],
            unit: [material.unit, Validators.required],
            status: [material.status]
          })
        );
      });
    }
    
    // Add manpower (team)
    if (workOrder.manpower && workOrder.manpower.length > 0) {
      workOrder.manpower.forEach(member => {
        this.manpowerFormArray.push(
          this.fb.group({
            user: this.fb.group({
              name: [member.user.name, Validators.required],
              email: [member.user.email, [Validators.required, Validators.email]]
            }),
            role: [member.role, Validators.required],
            hoursAssigned: [member.hoursAssigned || 0]
          })
        );
      });
    }
    
    // Add notes
    if (workOrder.notes && workOrder.notes.length > 0) {
      workOrder.notes.forEach(note => {
        this.notesFormArray.push(
          this.fb.group({
            content: [note.content, Validators.required],
            createdBy: this.fb.group({
              name: [note.createdBy.name]
            }),
            createdDate: [new Date(note.createdDate)]
          })
        );
      });
    }
    
    // Update form values
    this.workOrderForm.patchValue({
      orderNumber: workOrder.orderNumber,
      title: workOrder.title,
      description: workOrder.description,
      client: {
        name: workOrder.client.name,
        contactEmail: workOrder.client.contactEmail,
        contactPhone: workOrder.client.contactPhone,
        contactPerson: workOrder.client.contactPerson
      },
      siteLocation: workOrder.location.address,
      category: this.getCategory(workOrder.title),
      priority: workOrder.priority,
      status: workOrder.status,
      estimatedCost: workOrder.estimatedCost,
      completionPercentage: workOrder.completionPercentage,
      startDate: workOrder.startDate ? new Date(workOrder.startDate) : new Date(),
      targetEndDate: workOrder.targetEndDate ? new Date(workOrder.targetEndDate) : new Date(new Date().setMonth(new Date().getMonth() + 1))
    });
  }

  // Helper method to extract category from title
  private getCategory(title: string): string {
    // Simple logic to guess category from the title
    const titleLower = title.toLowerCase();
    
    for (const category of this.categories) {
      if (titleLower.includes(category.toLowerCase())) {
        return category;
      }
    }
    
    return 'Other';
  }

  get tasksFormArray(): FormArray {
    return this.workOrderForm.get('tasks') as FormArray;
  }
  
  get materialsFormArray(): FormArray {
    return this.workOrderForm.get('materials') as FormArray;
  }
  
  get manpowerFormArray(): FormArray {
    return this.workOrderForm.get('manpower') as FormArray;
  }
  
  get notesFormArray(): FormArray {
    return this.workOrderForm.get('notes') as FormArray;
  }
  
  addTask(): void {
    this.tasksFormArray.push(
      this.fb.group({
        name: ['', Validators.required],
        description: [''],
        status: ['pending']
      })
    );
  }
  
  removeTask(index: number): void {
    this.tasksFormArray.removeAt(index);
  }
  
  addMaterial(): void {
    this.materialsFormArray.push(
      this.fb.group({
        name: ['', Validators.required],
        quantity: [1, [Validators.required, Validators.min(1)]],
        unit: ['pcs', Validators.required],
        status: ['pending']
      })
    );
  }
  
  removeMaterial(index: number): void {
    this.materialsFormArray.removeAt(index);
  }
  
  addTeamMember(): void {
    this.manpowerFormArray.push(
      this.fb.group({
        user: this.fb.group({
          name: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        }),
        role: ['', Validators.required],
        hoursAssigned: [0]
      })
    );
  }
  
  removeTeamMember(index: number): void {
    this.manpowerFormArray.removeAt(index);
  }
  
  addNote(): void {
    this.notesFormArray.push(
      this.fb.group({
        content: ['', Validators.required],
        createdBy: this.fb.group({
          name: ['Current User']
        }),
        createdDate: [new Date()]
      })
    );
  }
  
  removeNote(index: number): void {
    this.notesFormArray.removeAt(index);
  }
  
  calculateTotalMaterialCost(): number {
    // This would require actual cost data from the API
    return 0;
  }
  
  onSubmit(): void {
    if (this.workOrderForm.invalid) {
      // Mark all fields as touched to show validation errors
      Object.keys(this.workOrderForm.controls).forEach(key => {
        const control = this.workOrderForm.get(key);
        control?.markAsTouched();
      });
      return;
    }
    
    this.saving = true;
    const workOrderData = this.workOrderForm.value;
    
    if (this.isEditMode) {
      // Update existing work order
      this.workOrderService.updateWorkOrder(this.workOrderId, workOrderData).subscribe({
        next: () => {
          this.saving = false;
          this.router.navigate(['/work-orders/details', this.workOrderId]);
        },
        error: (err) => {
          console.error('Error updating work order:', err);
          this.saving = false;
        }
      });
    } else {
      // Create new work order
      this.workOrderService.createWorkOrder(workOrderData).subscribe({
        next: (createdWorkOrder) => {
          this.saving = false;
          this.router.navigate(['/work-orders/details', createdWorkOrder.id]);
        },
        error: (err) => {
          console.error('Error creating work order:', err);
          this.saving = false;
        }
      });
    }
  }
  
  cancel(): void {
    if (this.isEditMode) {
      this.router.navigate(['/work-orders/details', this.workOrderId]);
    } else {
      this.router.navigate(['/work-orders']);
    }
  }
} 