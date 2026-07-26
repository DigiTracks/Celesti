import type { GenealogyRecord } from '@/types'

const lotPrefixes = ['HF','LF','TB','SA','MB','XC','QT','ZN','PV','KD']
const heatCodes = ['HT-','VT-','EB-','AR-','PL-']

export const genealogy: GenealogyRecord[] = Array.from({ length: 200 }, (_, i) => {
  const lotPrefix = lotPrefixes[i % lotPrefixes.length]!
  const parentCount = Math.floor(Math.random() * 4)
  const childCount = Math.floor(Math.random() * 3)

  return {
    id: `GEN-${String(i + 1).padStart(5, '0')}`,
    serialNumber: `SN-${String(2025000 + i)}`,
    partId: `PART-${String((i % 1200) + 1).padStart(5, '0')}`,
    lotNumber: `${lotPrefix}-${String(8000 + Math.floor(i / 4) * 7)}`,
    heatCode: `${heatCodes[i % heatCodes.length]!}${String(4000 + i * 3)}`,
    supplierId: `SUP-${String((i % 30) + 1).padStart(3, '0')}`,
    woId: `WO-${String((i % 450) + 1).padStart(5, '0')}`,
    cocStatus: (['VERIFIED','VERIFIED','VERIFIED','PENDING','FLAGGED'] as const)[i % 5]!,
    mtrUrl: `/documents/mtr-${String(9200 + i)}.pdf`,
    parentNodes: parentCount > 0 ? Array.from({ length: parentCount }, (_, j) => `GEN-${String(((i + j * 37) % 200) + 1).padStart(5, '0')}`) : [],
    childNodes: childCount > 0 ? Array.from({ length: childCount }, (_, j) => `GEN-${String(((i + j * 53 + 100) % 200) + 1).padStart(5, '0')}`) : [],
  }
})

export default genealogy
