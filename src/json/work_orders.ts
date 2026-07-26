import type { WorkOrder, WorkStep } from '@/types'

const stepTemplates: { name: string; torqueTarget?: number; torqueUnit?: string }[] = [
  { name: 'Receive & Inspect Material' },
  { name: 'Clean Surface per IPC-61A', torqueTarget: 1.2, torqueUnit: 'N·m' },
  { name: 'Apply Bonding Compound', torqueTarget: 0.8, torqueUnit: 'N·m' },
  { name: 'Position & Align Component' },
  { name: 'Torque Fasteners — Primary', torqueTarget: 5.6, torqueUnit: 'N·m' },
  { name: 'Torque Fasteners — Final', torqueTarget: 8.2, torqueUnit: 'N·m' },
  { name: 'Visual Inspection per AS9100D' },
  { name: 'Continuity Test — 4-Wire Kelvin' },
  { name: 'RF Sweep — S11/ S21 Parametric' },
  { name: 'Thermal Cycle: -55°C to +125°C' },
  { name: 'Seal & Potting Application' },
  { name: 'Burn-In 48hr @ 85°C' },
  { name: 'Final Dimensional Inspection' },
  { name: 'Mark & Serialize' },
  { name: 'QA Stamp & Traveler Sign-Off' },
]

const operators = [
  'J. Henderson','M. Kowalski','T. Brenner','K. Novak','P. Moreau','R. Yoshida','D. Fischer','A. Nielsen','S. Dubois','C. Johansson',
  'H. Yamada','F. Mueller','E. Petrov','W. Chen','G. Andersson','L. Bernard','V. Hartmann','N. Suzuki','O. Berg','P. Novak',
  'R. Sato','K. Weber','T. Ivanova','M. Lindqvist','J. Santos','B. Olsson','Y. Tanaka','C. Wagner','A. Mueller','D. Petrova',
]

function generateWOSteps(): WorkStep[] {
  const count = 5 + Math.floor(Math.random() * 10)
  return stepTemplates.slice(0, count).map((tmpl, i) => ({
    stepNumber: i + 1,
    name: tmpl.name,
    status: i < count - 2 ? 'completed' : i === count - 2 ? (Math.random() > 0.7 ? 'failed' : Math.random() > 0.5 ? 'in_progress' : 'pending') : 'pending',
    torqueTarget: tmpl.torqueTarget,
    torqueActual: tmpl.torqueTarget ? parseFloat((tmpl.torqueTarget! + (Math.random() * 0.8 - 0.4)).toFixed(2)) : undefined,
    torqueUnit: tmpl.torqueUnit,
    completedBy: i < count - 2 ? operators[Math.floor(Math.random() * operators.length)] : undefined,
    completedAt: i < count - 2 ? new Date(Date.now() - (count - i) * 86400000).toISOString() : undefined,
  }))
}

const WO_STATUSES: WorkOrder['status'][] = ['released','in_progress','in_progress','completed','completed','completed','on_hold','failed']
const PRIORITIES: WorkOrder['priority'][] = ['routine','routine','expedite','critical']

export function generateWorkOrders(count: number): WorkOrder[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `WO-${String(i + 1).padStart(5, '0')}`,
    woNumber: `WO-${String(2025 + Math.floor(i / 200))}-${String(1000 + (i % 999)).padStart(4, '0')}`,
    programId: `PRG-${String((i % 20) + 1).padStart(3, '0')}`,
    facilityId: `FAC-${['HYD','BLR','TRV'][i % 3]}-01`,
    partId: `PART-${String((i % 1200) + 1).padStart(5, '0')}`,
    quantity: Math.ceil(Math.random() * 50),
    quantityCompleted: Math.floor(Math.random() * 50),
    status: WO_STATUSES[i % WO_STATUSES.length]!,
    priority: PRIORITIES[i % PRIORITIES.length]!,
    dueDate: new Date(Date.now() + (Math.random() * 90 - 30) * 86400000).toISOString().split('T')[0]!,
    startedAt: new Date(Date.now() - (30 + Math.random() * 60) * 86400000).toISOString(),
    completedAt: Math.random() > 0.5 ? new Date(Date.now() - (Math.random() * 30) * 86400000).toISOString() : undefined,
    assignedOperator: operators[Math.floor(Math.random() * operators.length)]!,
    steps: generateWOSteps(),
  }))
}

export const workOrders: WorkOrder[] = generateWorkOrders(450)
export default workOrders
