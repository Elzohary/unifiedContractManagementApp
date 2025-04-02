export interface WorkOrder {
  id: string;
  title: string;
  description: string;
  status: WorkOrderStatus;
  priority: WorkOrderPriority;
  startDate: Date;
  endDate: Date;
  assignedTo: string[];
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  location: string;
  category: string;
  attachments: string[];
  remarks: WorkOrderRemark[];
  issues: WorkOrderIssue[];
  actionsNeeded: WorkOrderAction[];
  materials: WorkOrderMaterial[];
  photos: WorkOrderPhoto[];
  forms: WorkOrderForm[];
  expenses: WorkOrderExpense[];
  invoices: WorkOrderInvoice[];
  manpower: WorkOrderManpower[];
  permits: WorkOrderPermit[];
  equipment: WorkOrderEquipment[];
}

export interface WorkOrderRemark {
  id: string;
  workOrderId: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkOrderIssue {
  id: string;
  workOrderId: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkOrderAction {
  id: string;
  workOrderId: string;
  title: string;
  description: string;
  status: ActionStatus;
  dueDate: Date;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkOrderMaterial {
  id: string;
  workOrderId: string;
  materialId: string;
  quantity: number;
  unit: string;
  status: MaterialStatus;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkOrderPhoto {
  id: string;
  workOrderId: string;
  url: string;
  caption: string;
  takenBy: string;
  takenAt: Date;
}

export interface WorkOrderForm {
  id: string;
  workOrderId: string;
  formType: string;
  formData: any;
  submittedBy: string;
  submittedAt: Date;
}

export interface WorkOrderExpense {
  id: string;
  workOrderId: string;
  amount: number;
  currency: string;
  category: string;
  description: string;
  receiptUrl: string;
  createdBy: string;
  createdAt: Date;
  approvedBy: string;
  approvedAt: Date;
}

export interface WorkOrderInvoice {
  id: string;
  workOrderId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  dueDate: Date;
  createdBy: string;
  createdAt: Date;
  paidAt: Date;
}

export interface WorkOrderManpower {
  id: string;
  workOrderId: string;
  employeeId: string;
  role: string;
  startDate: Date;
  endDate: Date;
  hours: number;
  rate: number;
  status: ManpowerStatus;
}

export interface WorkOrderPermit {
  id: string;
  workOrderId: string;
  permitNumber: string;
  type: string;
  status: PermitStatus;
  issueDate: Date;
  expiryDate: Date;
  issuedBy: string;
}

export interface WorkOrderEquipment {
  id: string;
  workOrderId: string;
  equipmentId: string;
  startDate: Date;
  endDate: Date;
  status: EquipmentStatus;
}

export enum WorkOrderStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  OnHold = 'on_hold',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum WorkOrderPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent'
}

export enum IssueStatus {
  Open = 'open',
  InProgress = 'in_progress',
  Resolved = 'resolved',
  Closed = 'closed'
}

export enum IssuePriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Critical = 'critical'
}

export enum ActionStatus {
  Pending = 'pending',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum MaterialStatus {
  Requested = 'requested',
  Approved = 'approved',
  Ordered = 'ordered',
  Delivered = 'delivered',
  Returned = 'returned'
}

export enum InvoiceStatus {
  Pending = 'pending',
  Paid = 'paid',
  Overdue = 'overdue',
  Cancelled = 'cancelled'
}

export enum ManpowerStatus {
  Assigned = 'assigned',
  Working = 'working',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export enum PermitStatus {
  Pending = 'pending',
  Approved = 'approved',
  Expired = 'expired',
  Revoked = 'revoked'
}

export enum EquipmentStatus {
  Assigned = 'assigned',
  InUse = 'in_use',
  Returned = 'returned',
  Damaged = 'damaged'
} 