export interface User {
  id: string;
  name: string;
  email: string;
  role: 'administrator' | 'engineer' | 'foreman' | 'worker';
  avatar?: string;
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  startDate?: Date;
  endDate?: Date;
  assignedTo?: User;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  completionPercentage: number;
  dependencies?: string[]; // IDs of tasks that must be completed before this one
}

export interface LogEntry {
  id: string;
  date: Date;
  action: string;
  description: string;
  createdBy: User;
  attachments?: Attachment[];
}

export interface Permit {
  id: string;
  type: string; // e.g., 'Municipality', 'Electrical', 'Plumbing', etc.
  issueDate: Date;
  expiryDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  issuedBy: string;
  documentRef: string;
  attachments?: Attachment[];
}

export interface Manpower {
  id: string;
  user: User;
  role: string;
  hoursAssigned: number;
  startDate: Date;
  endDate?: Date;
  notes?: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  serialNumber?: string;
  quantity: number;
  assignedFrom: Date;
  assignedTo?: Date;
  status: 'available' | 'in-use' | 'maintenance' | 'damaged';
  notes?: string;
}

export interface Material {
  id: string;
  name: string;
  quantity: number;
  unit: string; // e.g., 'kg', 'liters', 'pieces', etc.
  deliveryDate?: Date;
  status: 'pending' | 'delivered' | 'used' | 'excess';
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdBy: User;
  createdDate: Date;
  assignedTo?: User;
  resolutionDate?: Date;
  resolutionNotes?: string;
  attachments?: Attachment[];
}

export interface Note {
  id: string;
  content: string;
  createdBy: User;
  createdDate: Date;
  updatedDate?: Date;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: Date;
  uploadedBy: User;
  url: string;
}

export interface Client {
  id: string;
  name: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface Location {
  id: string;
  name: string;
  address: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface WorkOrder {
  id: string;
  orderNumber: string;
  title: string;
  description: string;
  client: Client;
  location: Location;
  status: 'draft' | 'pending' | 'approved' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  requestDate: Date;
  startDate?: Date;
  targetEndDate?: Date;
  actualEndDate?: Date;
  engineerInCharge?: User;
  tasks: Task[];
  logs: LogEntry[];
  permits: Permit[];
  manpower: Manpower[];
  equipment: Equipment[];
  materials: Material[];
  issues: Issue[];
  notes: Note[];
  completionPercentage: number;
  estimatedCost?: number;
  actualCost?: number;
  attachments?: Attachment[];
  createdBy: User;
  createdDate: Date;
  lastUpdatedBy?: User;
  lastUpdatedDate?: Date;
} 