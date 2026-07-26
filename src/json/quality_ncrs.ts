import type { NCR, CAPA } from '@/types'

const ncrClauses = [
  'AS9100D Clause 8.7 — Nonconforming Outputs',
  'AS9100D Clause 8.5.1 — Production Process Verification',
  'AS9100D Clause 8.5.2 — Identification & Traceability',
  'AS9100D Clause 7.1.5 — Monitoring & Measurement Resources',
  'AS9100D Clause 8.5.3 — Property Belonging to Customer',
]

const descriptions = [
  'Torque value exceeded upper specification limit of 8.2 N·m during final fastening operation',
  'Particle count exceeded ISO-8 limits in cleanroom zone C3 during AIT integration',
  'Serial number marking illegible on bracket sub-assembly after anodizing process',
  'RF sweep S11 return loss measured −8.3 dB exceeding limit of −12 dB at 12.5 GHz',
  'Thermal cycle chamber temperature deviation of +7°C beyond profile tolerance band',
  'Bonding compound thickness measured 0.18 mm below minimum specified 0.25 mm',
  'Continuity test failure on harness assembly pin 23 to pin 47 — open circuit detected',
  'Certificate of Conformity missing Lot #HF-8832 from supplier AeroAlloys batch',
  'Dimensional inspection report shows hole pattern offset of 0.12 mm on bracket ST-0045',
  'Burn-in log incomplete — 12-hour gap in temperature recording at hour 28 of 48-hr cycle',
]

const severity: NCR['severity'][] = ['minor','major','major','critical','minor','major','critical','minor','major','minor']

const dispositions = ['Rework per RWO-3321','Use-as-is per MRB disposition #MRB-451','Scrap & replace per WO-33221-REPL','Rework per engineering directive ECR-7781']

export const ncrs: NCR[] = Array.from({ length: 75 }, (_, i) => ({
  id: `NCR-${String(i + 1).padStart(4, '0')}`,
  ncrNumber: `NCR-2025-${String(100 + i).padStart(4, '0')}`,
  woId: `WO-${String((i % 450) + 1).padStart(5, '0')}`,
  partId: `PART-${String((i % 1200) + 1).padStart(5, '0')}`,
  clause: ncrClauses[i % ncrClauses.length]!,
  severity: severity[i % severity.length]!,
  status: i < 12 ? 'open' : i < 30 ? 'under_review' : i < 50 ? 'disposition_pending' : 'closed',
  description: descriptions[i % descriptions.length]!,
  raisedBy: ['S. Nakamura','R. Yoshida','P. Moreau','K. Novak','W. Chen'][i % 5]!,
  raisedAt: new Date(Date.now() - (75 - i) * 86400000 * 2).toISOString(),
  disposition: i >= 12 ? dispositions[i % dispositions.length]! : undefined,
  closedAt: i >= 50 ? new Date(Date.now() - (75 - i) * 86400000).toISOString() : undefined,
}))

export const capas: CAPA[] = Array.from({ length: 140 }, (_, i) => ({
  id: `CAPA-${String(i + 1).padStart(4, '0')}`,
  capaNumber: `CAPA-2025-${String(500 + i).padStart(4, '0')}`,
  ncrId: `NCR-${String((i % 75) + 1).padStart(4, '0')}`,
  rootCause: [
    'Operator training gap on calibrated torque tool use — recertification required',
    'HVAC filter replacement schedule deviation — PM compliance gap',
    'Laser marking parameter drift — preventive maintenance interval exceeded',
    'Test fixture calibration overdue by 14 days — calibration program weakness',
    'Thermal chamber PID controller tuning drift — control loop misconfiguration',
    'Material batch variation in bonding agent viscosity — supplier SQA escalation',
    'Crimping tool die wear beyond tolerance — tool lifecycle management gap',
    'Supplier CoC verification process bypassed — receiving inspection procedure gap',
    'CNC fixture wear pattern causing positional drift — fixture maintenance schedule gap',
    'Data logger buffer overflow during extended burn-in — firmware upgrade required',
  ][i % 10]!,
  actionPlan: [
    'Implement quarterly torque tool recertification program with documented records',
    'Revise HVAC PM schedule from 90 to 60 days; install differential pressure sensors',
    'Add laser power calibration to weekly preventive maintenance checklist',
    'Implement automated calibration reminder system integrated with MES',
    'Replace PID controller with auto-tuning model; require weekly performance log review',
    'Elevate supplier to SQA critical vendor list; implement incoming batch testing',
    'Establish tool die wear measurement at 500-cycle intervals with replacement threshold',
    'Update receiving inspection procedure RI-007 to require CoC scan before acceptance',
    'Implement CMM fixture calibration at 90-day intervals with certification stickers',
    'Upgrade data loggers to industrial SSD storage; implement buffer overflow alert',
  ][i % 10]!,
  owner: ['J. Caldwell','R. Yoshida','S. Nakamura','L. Kowalski','M. Kowalski','J. Henderson','S. Dubois','C. Johansson'][i % 8]!,
  status: i < 20 ? 'draft' : i < 50 ? 'in_progress' : i < 80 ? 'verified' : 'closed',
  targetDate: new Date(Date.now() + (30 + Math.random() * 120) * 86400000).toISOString().split('T')[0]!,
  closedAt: i >= 80 ? new Date(Date.now() - (140 - i) * 86400000).toISOString() : undefined,
}))

export default { ncrs, capas }
