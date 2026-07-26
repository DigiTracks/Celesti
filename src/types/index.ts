export interface Persona {
  id: string
  name: string
  role: 'CEO' | 'MFG_ENGINEER' | 'QUALITY_INSPECTOR' | 'TECHNICIAN' | 'SUPPLIER' | 'AUDITOR'
  clearanceLevel: 'LEVEL_1' | 'LEVEL_2' | 'LEVEL_3' | 'ITAR_FULL'
  stampCode?: string
  avatarUrl: string
}

export interface Facility {
  id: string
  name: string
  location: string
  type: 'Cleanroom ISO-8' | 'AIT Integration' | 'Testing & Validation'
  status: 'operational' | 'maintenance' | 'offline'
  oee: number
  fpy: number
  activeOrders: number
  employeeCount: number
  sqft: number
}

export interface Program {
  id: string
  name: string
  customer: string
  type: 'Satellite' | 'Launch Vehicle' | 'Ground System' | 'R&D'
  status: 'active' | 'completed' | 'on-hold'
  startDate: string
  endDate: string
  budget: number
  progress: number
}

export interface Part {
  id: string
  partNumber: string
  name: string
  category: 'RF Component' | 'Structural' | 'IC' | 'Fastener' | 'Harness' | 'Optical'
  material: string
  rev: string
  lifecycle: 'prototype' | 'qualified' | 'production' | 'obsolete'
  supplierId: string
  unitCost: number
  leadTimeDays: number
}

export interface WorkOrder {
  id: string
  woNumber: string
  programId: string
  facilityId: string
  partId: string
  quantity: number
  quantityCompleted: number
  status: 'released' | 'in_progress' | 'on_hold' | 'completed' | 'failed'
  priority: 'routine' | 'expedite' | 'critical'
  dueDate: string
  startedAt: string
  completedAt?: string
  assignedOperator: string
  steps: WorkStep[]
}

export interface WorkStep {
  stepNumber: number
  name: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  torqueTarget?: number
  torqueActual?: number
  torqueUnit?: string
  completedBy?: string
  completedAt?: string
}

export interface NCR {
  id: string
  ncrNumber: string
  woId: string
  partId: string
  clause: string
  severity: 'minor' | 'major' | 'critical'
  status: 'open' | 'under_review' | 'disposition_pending' | 'closed'
  description: string
  raisedBy: string
  raisedAt: string
  disposition?: string
  closedAt?: string
}

export interface CAPA {
  id: string
  capaNumber: string
  ncrId: string
  rootCause: string
  actionPlan: string
  owner: string
  status: 'draft' | 'in_progress' | 'verified' | 'closed'
  targetDate: string
  closedAt?: string
}

export interface Supplier {
  id: string
  name: string
  tier: 1 | 2 | 3
  as9100Certified: boolean
  auditScore: number
  amlStatus: 'approved' | 'conditional' | 'suspended'
  partsSupplied: string[]
  location: string
}

export interface GenealogyRecord {
  id: string
  serialNumber: string
  partId: string
  lotNumber: string
  heatCode: string
  supplierId: string
  woId: string
  cocStatus: 'VERIFIED' | 'PENDING' | 'FLAGGED'
  mtrUrl?: string
  parentNodes: string[]
  childNodes: string[]
}

export interface TelemetryReading {
  facilityId: string
  particleCount05um: number
  temperatureC: number
  relativeHumidityPct: number
  timestamp: string
}

export interface KPIMetric {
  title: string
  value: string | number
  unit?: string
  trend?: { value: number; isPositive: boolean }
  status: 'pass' | 'warning' | 'fail' | 'neutral'
}

export interface TourStep {
  targetRoute: string
  targetElementSelector: string
  title: string
  content: string
}
