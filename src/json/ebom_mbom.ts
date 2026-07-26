export interface BomRecord {
  id: string
  programId: string
  partNumber: string
  name: string
  revEbom: string
  revMbom: string
  status: 'match' | 'diff_rev' | 'diff_part' | 'missing_mbom' | 'missing_ebom'
  qty: number
  level: number
  parentId: string | null
}

export const ebom_mbom: BomRecord[] = [
  {
    id: 'BM-001',
    programId: 'PRG-001',
    partNumber: 'SAT-205-PLM-00',
    name: 'SAT-205 Comm Satellite',
    revEbom: 'C4',
    revMbom: 'C5',
    status: 'diff_rev',
    qty: 1,
    level: 0,
    parentId: null,
  },
  {
    id: 'BM-002',
    programId: 'PRG-001',
    partNumber: 'RF-1001-01',
    name: 'S-Band Transceiver Assembly',
    revEbom: 'B2',
    revMbom: 'B3',
    status: 'diff_rev',
    qty: 2,
    level: 1,
    parentId: 'BM-001',
  },
  {
    id: 'BM-003',
    programId: 'PRG-001',
    partNumber: 'ST-2002-03',
    name: 'Primary Structure Frame',
    revEbom: 'A8',
    revMbom: 'A8',
    status: 'match',
    qty: 1,
    level: 1,
    parentId: 'BM-001',
  },
  {
    id: 'BM-004',
    programId: 'PRG-001',
    partNumber: 'IC-3003-01',
    name: 'FPGA Telemetry Controller',
    revEbom: 'D1',
    revMbom: 'D2',
    status: 'diff_rev',
    qty: 3,
    level: 1,
    parentId: 'BM-001',
  },
  {
    id: 'BM-005',
    programId: 'PRG-001',
    partNumber: 'HR-4004-02',
    name: 'RF Harness Assembly',
    revEbom: 'C2',
    revMbom: 'C3',
    status: 'diff_rev',
    qty: 4,
    level: 1,
    parentId: 'BM-001',
  },
  {
    id: 'BM-006',
    programId: 'PRG-001',
    partNumber: 'IC-3003-02',
    name: 'SoC Telemetry Controller',
    revEbom: '',
    revMbom: 'D1',
    status: 'missing_ebom',
    qty: 3,
    level: 2,
    parentId: 'BM-004',
  },
  {
    id: 'BM-007',
    programId: 'PRG-001',
    partNumber: 'FT-5005-01',
    name: 'Ti M6 Fastener Kit',
    revEbom: 'A3',
    revMbom: '',
    status: 'missing_mbom',
    qty: 48,
    level: 2,
    parentId: 'BM-001',
  },
  {
    id: 'BM-008',
    programId: 'PRG-001',
    partNumber: 'RF-1001-01-A',
    name: 'S-Band RF Module',
    revEbom: 'B2',
    revMbom: 'B3',
    status: 'diff_rev',
    qty: 2,
    level: 2,
    parentId: 'BM-002',
  },
]
