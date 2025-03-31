import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { WorkOrder, User, Task, Issue, Permit, Manpower, Equipment, Material, Note, LogEntry } from '../models/work-order.model';

@Injectable({
  providedIn: 'root'
})
export class WorkOrderService {
  private mockUsers: User[] = [
    {
      id: 'user1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      role: 'administrator',
      avatar: 'assets/avatars/avatar1.png'
    },
    {
      id: 'user2',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'engineer',
      avatar: 'assets/avatars/avatar2.png'
    },
    {
      id: 'user3',
      name: 'Robert Davis',
      email: 'robert.davis@example.com',
      role: 'foreman',
      avatar: 'assets/avatars/avatar3.png'
    },
    {
      id: 'user4',
      name: 'Michael Wong',
      email: 'michael.wong@example.com',
      role: 'worker',
      avatar: 'assets/avatars/avatar4.png'
    }
  ];

  private mockWorkOrders: WorkOrder[] = [
    {
      id: 'wo1',
      orderNumber: 'WO-2023-001',
      title: 'Commercial Building Renovation',
      description: 'Renovation of the 3rd floor office space at Downtown Business Center',
      client: {
        id: 'client1',
        name: 'ABC Corporation',
        contactPerson: 'Jane Wilson',
        contactEmail: 'jane.wilson@abccorp.com',
        contactPhone: '555-123-4567',
        address: '123 Business Ave, Downtown'
      },
      location: {
        id: 'loc1',
        name: 'Downtown Business Center',
        address: '123 Business Ave, Downtown',
        coordinates: {
          latitude: 34.052235,
          longitude: -118.243683
        }
      },
      status: 'in-progress',
      priority: 'high',
      requestDate: new Date('2023-09-01'),
      startDate: new Date('2023-09-10'),
      targetEndDate: new Date('2023-10-30'),
      engineerInCharge: this.mockUsers[1], // Alice Johnson
      tasks: [
        {
          id: 'task1',
          name: 'Site Assessment',
          description: 'Initial assessment of the site and requirements',
          status: 'completed',
          startDate: new Date('2023-09-10'),
          endDate: new Date('2023-09-12'),
          assignedTo: this.mockUsers[1],
          priority: 'high',
          completionPercentage: 100
        },
        {
          id: 'task2',
          name: 'Municipality Permit',
          description: 'Obtain necessary permits from the local municipality',
          status: 'completed',
          startDate: new Date('2023-09-13'),
          endDate: new Date('2023-09-20'),
          assignedTo: this.mockUsers[0],
          priority: 'high',
          completionPercentage: 100
        },
        {
          id: 'task3',
          name: 'Material Procurement',
          description: 'Order and receive all necessary materials',
          status: 'in-progress',
          startDate: new Date('2023-09-21'),
          assignedTo: this.mockUsers[2],
          priority: 'medium',
          completionPercentage: 60
        },
        {
          id: 'task4',
          name: 'Demolition Work',
          description: 'Remove existing partition walls and fixtures',
          status: 'in-progress',
          startDate: new Date('2023-09-25'),
          assignedTo: this.mockUsers[2],
          priority: 'medium',
          completionPercentage: 75,
          dependencies: ['task1', 'task2']
        },
        {
          id: 'task5',
          name: 'Electrical Installation',
          description: 'Install new electrical wiring and fixtures',
          status: 'pending',
          priority: 'medium',
          completionPercentage: 0,
          dependencies: ['task4']
        }
      ],
      logs: [
        {
          id: 'log1',
          date: new Date('2023-09-10'),
          action: 'Work Order Started',
          description: 'Initial site visit and assessment completed',
          createdBy: this.mockUsers[1]
        },
        {
          id: 'log2',
          date: new Date('2023-09-20'),
          action: 'Permit Approved',
          description: 'Municipality permit approved and received',
          createdBy: this.mockUsers[0]
        },
        {
          id: 'log3',
          date: new Date('2023-09-25'),
          action: 'Demolition Started',
          description: 'Demolition work has begun on the 3rd floor',
          createdBy: this.mockUsers[2]
        }
      ],
      permits: [
        {
          id: 'permit1',
          type: 'Municipality',
          issueDate: new Date('2023-09-20'),
          expiryDate: new Date('2023-12-20'),
          status: 'approved',
          issuedBy: 'City Planning Department',
          documentRef: 'MPR-2023-4567'
        }
      ],
      manpower: [
        {
          id: 'mp1',
          user: this.mockUsers[2],
          role: 'Foreman',
          hoursAssigned: 160,
          startDate: new Date('2023-09-10')
        },
        {
          id: 'mp2',
          user: this.mockUsers[3],
          role: 'Construction Worker',
          hoursAssigned: 160,
          startDate: new Date('2023-09-25')
        }
      ],
      equipment: [
        {
          id: 'equip1',
          name: 'Excavator',
          type: 'Heavy Equipment',
          serialNumber: 'EX-2021-789',
          quantity: 1,
          assignedFrom: new Date('2023-09-25'),
          assignedTo: new Date('2023-10-05'),
          status: 'in-use'
        },
        {
          id: 'equip2',
          name: 'Concrete Mixer',
          type: 'Heavy Equipment',
          serialNumber: 'CM-2020-456',
          quantity: 2,
          assignedFrom: new Date('2023-10-01'),
          status: 'available'
        }
      ],
      materials: [
        {
          id: 'mat1',
          name: 'Cement',
          quantity: 50,
          unit: 'bags',
          deliveryDate: new Date('2023-09-22'),
          status: 'delivered'
        },
        {
          id: 'mat2',
          name: 'Steel Reinforcement',
          quantity: 200,
          unit: 'kg',
          status: 'pending'
        }
      ],
      issues: [
        {
          id: 'issue1',
          title: 'Unexpected Plumbing Layout',
          description: 'Discovered existing plumbing layout differs from blueprints',
          priority: 'high',
          status: 'in-progress',
          createdBy: this.mockUsers[2],
          createdDate: new Date('2023-09-26'),
          assignedTo: this.mockUsers[1]
        }
      ],
      notes: [
        {
          id: 'note1',
          content: 'Client requested additional power outlets on the north wall',
          createdBy: this.mockUsers[1],
          createdDate: new Date('2023-09-15')
        },
        {
          id: 'note2',
          content: 'Building inspection scheduled for Oct 15',
          createdBy: this.mockUsers[0],
          createdDate: new Date('2023-09-28')
        }
      ],
      completionPercentage: 45,
      estimatedCost: 75000,
      actualCost: 35000,
      createdBy: this.mockUsers[0],
      createdDate: new Date('2023-08-28')
    },
    {
      id: 'wo2',
      orderNumber: 'WO-2023-002',
      title: 'Residential Plumbing Repair',
      description: 'Emergency plumbing repair at Sunset Apartments, Unit 302',
      client: {
        id: 'client2',
        name: 'Sunset Apartments',
        contactPerson: 'Tom Garcia',
        contactEmail: 'manager@sunsetapts.com',
        contactPhone: '555-987-6543',
        address: '456 Sunset Blvd, Westside'
      },
      location: {
        id: 'loc2',
        name: 'Sunset Apartments',
        address: '456 Sunset Blvd, Westside',
        coordinates: {
          latitude: 34.076124,
          longitude: -118.375694
        }
      },
      status: 'completed',
      priority: 'urgent',
      requestDate: new Date('2023-09-15'),
      startDate: new Date('2023-09-16'),
      targetEndDate: new Date('2023-09-18'),
      actualEndDate: new Date('2023-09-17'),
      engineerInCharge: this.mockUsers[1],
      tasks: [
        {
          id: 'task6',
          name: 'Plumbing Assessment',
          description: 'Assess the extent of water damage and identify leak source',
          status: 'completed',
          startDate: new Date('2023-09-16'),
          endDate: new Date('2023-09-16'),
          assignedTo: this.mockUsers[1],
          priority: 'urgent',
          completionPercentage: 100
        },
        {
          id: 'task7',
          name: 'Pipe Replacement',
          description: 'Replace damaged pipes and connectors',
          status: 'completed',
          startDate: new Date('2023-09-16'),
          endDate: new Date('2023-09-17'),
          assignedTo: this.mockUsers[3],
          priority: 'urgent',
          completionPercentage: 100,
          dependencies: ['task6']
        }
      ],
      logs: [
        {
          id: 'log4',
          date: new Date('2023-09-16'),
          action: 'Work Order Started',
          description: 'Emergency response to reported water leak',
          createdBy: this.mockUsers[1]
        },
        {
          id: 'log5',
          date: new Date('2023-09-17'),
          action: 'Work Order Completed',
          description: 'Plumbing repairs completed and tested',
          createdBy: this.mockUsers[1]
        }
      ],
      permits: [],
      manpower: [
        {
          id: 'mp3',
          user: this.mockUsers[3],
          role: 'Plumber',
          hoursAssigned: 8,
          startDate: new Date('2023-09-16'),
          endDate: new Date('2023-09-17')
        }
      ],
      equipment: [],
      materials: [
        {
          id: 'mat3',
          name: 'Copper Pipe',
          quantity: 5,
          unit: 'meters',
          deliveryDate: new Date('2023-09-16'),
          status: 'used'
        },
        {
          id: 'mat4',
          name: 'Pipe Fittings',
          quantity: 10,
          unit: 'pieces',
          deliveryDate: new Date('2023-09-16'),
          status: 'used'
        }
      ],
      issues: [],
      notes: [
        {
          id: 'note3',
          content: 'Recommended regular maintenance check for other units in the building',
          createdBy: this.mockUsers[3],
          createdDate: new Date('2023-09-17')
        }
      ],
      completionPercentage: 100,
      estimatedCost: 1200,
      actualCost: 950,
      createdBy: this.mockUsers[0],
      createdDate: new Date('2023-09-15'),
      lastUpdatedBy: this.mockUsers[1],
      lastUpdatedDate: new Date('2023-09-17')
    },
    {
      id: 'wo3',
      orderNumber: 'WO-2023-003',
      title: 'School Playground Installation',
      description: 'Installation of new playground equipment at Lincoln Elementary School',
      client: {
        id: 'client3',
        name: 'Lincoln Elementary School',
        contactPerson: 'Principal Sarah Chen',
        contactEmail: 'principal@lincolnelementary.edu',
        contactPhone: '555-234-5678',
        address: '789 Education St, Northside'
      },
      location: {
        id: 'loc3',
        name: 'Lincoln Elementary School',
        address: '789 Education St, Northside'
      },
      status: 'pending',
      priority: 'medium',
      requestDate: new Date('2023-09-20'),
      targetEndDate: new Date('2023-11-15'),
      tasks: [
        {
          id: 'task8',
          name: 'Site Preparation',
          description: 'Clear and level the designated playground area',
          status: 'pending',
          priority: 'medium',
          completionPercentage: 0
        },
        {
          id: 'task9',
          name: 'Equipment Installation',
          description: 'Install playground equipment according to specifications',
          status: 'pending',
          priority: 'medium',
          completionPercentage: 0,
          dependencies: ['task8']
        },
        {
          id: 'task10',
          name: 'Safety Inspection',
          description: 'Conduct safety inspection of installed equipment',
          status: 'pending',
          priority: 'high',
          completionPercentage: 0,
          dependencies: ['task9']
        }
      ],
      logs: [
        {
          id: 'log6',
          date: new Date('2023-09-20'),
          action: 'Work Order Created',
          description: 'Playground installation project initiated',
          createdBy: this.mockUsers[0]
        }
      ],
      permits: [
        {
          id: 'permit2',
          type: 'School Board Approval',
          issueDate: new Date('2023-09-18'),
          expiryDate: new Date('2023-12-18'),
          status: 'approved',
          issuedBy: 'District School Board',
          documentRef: 'SB-2023-789'
        }
      ],
      manpower: [],
      equipment: [],
      materials: [],
      issues: [],
      notes: [
        {
          id: 'note4',
          content: 'Project scheduled to start after school hours and weekends to minimize disruption',
          createdBy: this.mockUsers[0],
          createdDate: new Date('2023-09-20')
        }
      ],
      completionPercentage: 0,
      estimatedCost: 45000,
      createdBy: this.mockUsers[0],
      createdDate: new Date('2023-09-20')
    }
  ];

  private workOrdersSubject = new BehaviorSubject<WorkOrder[]>(this.mockWorkOrders);
  
  constructor() { }

  // Get all work orders
  getWorkOrders(): Observable<WorkOrder[]> {
    return this.workOrdersSubject.asObservable().pipe(
      delay(500) // Simulate network delay
    );
  }

  // Get work orders by status
  getWorkOrdersByStatus(status: string): Observable<WorkOrder[]> {
    return this.workOrdersSubject.asObservable().pipe(
      map(workOrders => workOrders.filter(wo => wo.status === status)),
      delay(500)
    );
  }

  // Get a specific work order by ID
  getWorkOrderById(id: string): Observable<WorkOrder | undefined> {
    return this.workOrdersSubject.asObservable().pipe(
      map(workOrders => workOrders.find(wo => wo.id === id)),
      delay(500)
    );
  }

  // Add a new work order
  addWorkOrder(workOrder: WorkOrder): Observable<WorkOrder> {
    const updatedWorkOrders = [...this.workOrdersSubject.value, workOrder];
    this.workOrdersSubject.next(updatedWorkOrders);
    return of(workOrder).pipe(delay(500));
  }

  // Create a new work order
  createWorkOrder(workOrderData: any): Observable<WorkOrder> {
    // Generate a new ID and order number
    const newId = `wo${this.workOrdersSubject.value.length + 1}`;
    const orderNumber = `WO-${new Date().getFullYear()}-${(this.workOrdersSubject.value.length + 1).toString().padStart(3, '0')}`;
    
    // Create a new work order with default values
    const newWorkOrder: WorkOrder = {
      id: newId,
      orderNumber: workOrderData.orderNumber || orderNumber,
      title: workOrderData.title,
      description: workOrderData.description,
      client: workOrderData.client,
      location: {
        id: `loc${this.workOrdersSubject.value.length + 1}`,
        name: workOrderData.siteLocation,
        address: workOrderData.siteLocation
      },
      status: workOrderData.status || 'draft',
      priority: workOrderData.priority || 'medium',
      requestDate: new Date(),
      startDate: workOrderData.startDate || new Date(),
      targetEndDate: workOrderData.dueDate || new Date(new Date().setMonth(new Date().getMonth() + 1)),
      tasks: workOrderData.tasks || [],
      logs: [],
      permits: [],
      manpower: workOrderData.team || [],
      equipment: [],
      materials: workOrderData.materials || [],
      issues: [],
      notes: workOrderData.notes || [],
      completionPercentage: workOrderData.completionPercentage || 0,
      estimatedCost: workOrderData.estimatedCost,
      createdBy: this.mockUsers[0],
      createdDate: new Date()
    };
    
    return this.addWorkOrder(newWorkOrder);
  }

  // Update an existing work order
  updateWorkOrder(id: string, workOrderData: any): Observable<WorkOrder> {
    const workOrder = this.workOrdersSubject.value.find(wo => wo.id === id);
    if (!workOrder) {
      return throwError(() => new Error('Work order not found'));
    }

    const updatedWorkOrder: WorkOrder = {
      ...workOrder,
      title: workOrderData.title || workOrder.title,
      description: workOrderData.description || workOrder.description,
      client: workOrderData.client || workOrder.client,
      status: workOrderData.status || workOrder.status,
      priority: workOrderData.priority || workOrder.priority,
      completionPercentage: workOrderData.completionPercentage || workOrder.completionPercentage,
      estimatedCost: workOrderData.estimatedCost || workOrder.estimatedCost,
      startDate: workOrderData.startDate || workOrder.startDate,
      targetEndDate: workOrderData.dueDate || workOrder.targetEndDate,
      lastUpdatedBy: this.mockUsers[0],
      lastUpdatedDate: new Date()
    };

    // Update location if siteLocation provided
    if (workOrderData.siteLocation) {
      updatedWorkOrder.location = {
        ...workOrder.location,
        name: workOrderData.siteLocation,
        address: workOrderData.siteLocation
      };
    }

    // Update tasks, materials, team if provided
    if (workOrderData.tasks) {
      updatedWorkOrder.tasks = workOrderData.tasks;
    }
    
    if (workOrderData.materials) {
      updatedWorkOrder.materials = workOrderData.materials;
    }
    
    if (workOrderData.team) {
      updatedWorkOrder.manpower = workOrderData.team;
    }
    
    if (workOrderData.notes) {
      updatedWorkOrder.notes = workOrderData.notes;
    }

    const updatedWorkOrders = this.workOrdersSubject.value.map(wo => 
      wo.id === id ? updatedWorkOrder : wo
    );
    
    this.workOrdersSubject.next(updatedWorkOrders);
    return of(updatedWorkOrder).pipe(delay(500));
  }

  // Delete a work order
  deleteWorkOrder(id: string): Observable<boolean> {
    const updatedWorkOrders = this.workOrdersSubject.value.filter(wo => wo.id !== id);
    this.workOrdersSubject.next(updatedWorkOrders);
    return of(true).pipe(delay(500));
  }

  // Add a task to a work order
  addTask(workOrderId: string, task: Task): Observable<WorkOrder | undefined> {
    const workOrder = this.workOrdersSubject.value.find(wo => wo.id === workOrderId);
    if (!workOrder) {
      return of(undefined);
    }

    const updatedWorkOrder = {
      ...workOrder,
      tasks: [...workOrder.tasks, task]
    };

    return this.updateWorkOrder(workOrderId, updatedWorkOrder);
  }

  // Add an issue to a work order
  addIssue(workOrderId: string, issue: Issue): Observable<WorkOrder | undefined> {
    const workOrder = this.workOrdersSubject.value.find(wo => wo.id === workOrderId);
    if (!workOrder) {
      return of(undefined);
    }

    const updatedWorkOrder = {
      ...workOrder,
      issues: [...workOrder.issues, issue]
    };

    return this.updateWorkOrder(workOrderId, updatedWorkOrder);
  }

  // Add a note to a work order
  addNote(workOrderId: string, note: Note): Observable<WorkOrder | undefined> {
    const workOrder = this.workOrdersSubject.value.find(wo => wo.id === workOrderId);
    if (!workOrder) {
      return of(undefined);
    }

    const updatedWorkOrder = {
      ...workOrder,
      notes: [...workOrder.notes, note]
    };

    return this.updateWorkOrder(workOrderId, updatedWorkOrder);
  }

  // Add a log entry to a work order
  addLogEntry(workOrderId: string, logEntry: LogEntry): Observable<WorkOrder | undefined> {
    const workOrder = this.workOrdersSubject.value.find(wo => wo.id === workOrderId);
    if (!workOrder) {
      return of(undefined);
    }

    const updatedWorkOrder = {
      ...workOrder,
      logs: [...workOrder.logs, logEntry]
    };

    return this.updateWorkOrder(workOrderId, updatedWorkOrder);
  }

  // Get users (for assignments)
  getUsers(): Observable<User[]> {
    return of(this.mockUsers).pipe(delay(500));
  }
} 