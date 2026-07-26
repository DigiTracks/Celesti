import type { Program } from '@/types'

export const programs: Program[] = [
  { id: 'PRG-001', name: 'SAT-205 Communication Satellite', customer: 'ISRO', type: 'Satellite', status: 'active', startDate: '2025-03-01', endDate: '2027-06-30', budget: 475000000, progress: 38 },
  { id: 'PRG-002', name: 'EO-OBSERVER-03 Earth Observation', customer: 'ISRO', type: 'Satellite', status: 'active', startDate: '2024-11-15', endDate: '2026-08-31', budget: 320000000, progress: 62 },
  { id: 'PRG-003', name: 'LV-PSLV-C58 Launch Vehicle', customer: 'ISRO', type: 'Launch Vehicle', status: 'active', startDate: '2025-01-10', endDate: '2026-12-31', budget: 580000000, progress: 45 },
  { id: 'PRG-004', name: 'GSLV-MK3 Upper Stage Enhancement', customer: 'ISRO', type: 'Launch Vehicle', status: 'active', startDate: '2024-07-01', endDate: '2027-03-31', budget: 690000000, progress: 55 },
  { id: 'PRG-005', name: 'NAV-STAR-02 Navigation Payload', customer: 'DRDO', type: 'Satellite', status: 'active', startDate: '2025-06-01', endDate: '2027-09-30', budget: 280000000, progress: 22 },
  { id: 'PRG-006', name: 'RFD-12 Radar Frequency Digitizer', customer: 'DRDO', type: 'Ground System', status: 'active', startDate: '2025-02-15', endDate: '2027-01-31', budget: 195000000, progress: 41 },
  { id: 'PRG-007', name: 'HYP-01 Hyperspectral Imager', customer: 'ISRO', type: 'R&D', status: 'active', startDate: '2025-09-01', endDate: '2028-03-31', budget: 150000000, progress: 12 },
  { id: 'PRG-008', name: 'GAGAN-2 SBAS Transponder', customer: 'AAI', type: 'Satellite', status: 'active', startDate: '2024-04-01', endDate: '2026-11-30', budget: 410000000, progress: 78 },
  { id: 'PRG-009', name: 'QSAT-01 Quantum Communications Demo', customer: 'DRDO', type: 'R&D', status: 'active', startDate: '2025-05-01', endDate: '2027-12-31', budget: 230000000, progress: 18 },
  { id: 'PRG-010', name: 'SAR-XL X-Band Synthetic Aperture Radar', customer: 'ISRO', type: 'Satellite', status: 'active', startDate: '2024-08-01', endDate: '2027-04-30', budget: 520000000, progress: 48 },
  { id: 'PRG-011', name: 'GSAT-31R Communication Replacement', customer: 'ISRO', type: 'Satellite', status: 'on-hold', startDate: '2024-01-01', endDate: '2026-06-30', budget: 340000000, progress: 85 },
  { id: 'PRG-012', name: 'ADMIRE-1 Atmospheric Drag Meas.', customer: 'ISRO', type: 'R&D', status: 'completed', startDate: '2023-06-01', endDate: '2025-03-31', budget: 85000000, progress: 100 },
  { id: 'PRG-013', name: 'PS4-OP Orbital Platform Upgrade', customer: 'ISRO', type: 'Launch Vehicle', status: 'active', startDate: '2025-04-01', endDate: '2027-08-31', budget: 175000000, progress: 28 },
  { id: 'PRG-014', name: 'VYOM-1 Crew Module Structure', customer: 'ISRO', type: 'R&D', status: 'active', startDate: '2025-08-01', endDate: '2028-06-30', budget: 680000000, progress: 8 },
  { id: 'PRG-015', name: 'IDRSS-02 Data Relay Satellite', customer: 'ISRO', type: 'Satellite', status: 'active', startDate: '2024-10-01', endDate: '2027-02-28', budget: 390000000, progress: 35 },
  { id: 'PRG-016', name: 'RISAT-2BR2 Radar Imaging', customer: 'ISRO', type: 'Satellite', status: 'on-hold', startDate: '2024-05-01', endDate: '2026-09-30', budget: 445000000, progress: 70 },
  { id: 'PRG-017', name: 'HELIOS-1 Solar Probe Instruments', customer: 'ISRO', type: 'R&D', status: 'active', startDate: '2025-11-01', endDate: '2028-12-31', budget: 510000000, progress: 5 },
  { id: 'PRG-018', name: 'CARTOSAT-4 HR Mapping', customer: 'ISRO', type: 'Satellite', status: 'completed', startDate: '2023-09-01', endDate: '2025-06-30', budget: 295000000, progress: 100 },
  { id: 'PRG-019', name: 'GSAT-32 Ka-Band HTS', customer: 'ISRO', type: 'Satellite', status: 'active', startDate: '2025-07-01', endDate: '2028-01-31', budget: 460000000, progress: 15 },
  { id: 'PRG-020', name: 'CHANDRAYAAN-4 Propulsion Module', customer: 'ISRO', type: 'R&D', status: 'active', startDate: '2025-12-01', endDate: '2029-03-31', budget: 800000000, progress: 3 },
]
