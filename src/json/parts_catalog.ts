import type { Part } from '@/types'

const categories: Part['category'][] = ['RF Component', 'Structural', 'IC', 'Fastener', 'Harness', 'Optical']
const materials = ['Al 7075-T6','Ti-6Al-4V','Inconel 718','SS 316L','BeCu C17200','Al 6061-T6','Ti-6Al-2Sn-4Zr-2Mo','MP35N','Kovar','Al 2024-T3','Waspaloy','Ti-10V-2Fe-3Al']
const lifecycles: Part['lifecycle'][] = ['prototype','qualified','production','production','production','qualified','obsolete']

function generatePart(index: number): Part {
  const cat = categories[index % categories.length]!
  const prefix = cat === 'RF Component' ? 'RF' : cat === 'Structural' ? 'ST' : cat === 'IC' ? 'IC' : cat === 'Fastener' ? 'FT' : cat === 'Harness' ? 'HR' : 'OP'
  const rev = `${String.fromCharCode(65 + (index % 6))}${Math.floor(index / 6) % 4 + 1}`
  return {
    id: `PART-${String(index + 1).padStart(5, '0')}`,
    partNumber: `${prefix}-${String(1000 + (index % 900)).padStart(4, '0')}-${String(Math.floor(index / 900) + 1).padStart(2, '0')}`,
    name: `${cat} ${['Assembly','Module','Unit','Sub-Assembly','Component','Element','Block','Segment','Package','Insert'][index % 10]} ${String.fromCharCode(65 + (index % 5))}${index % 7 + 1}`,
    category: cat,
    material: materials[index % materials.length]!,
    rev,
    lifecycle: lifecycles[index % lifecycles.length]!,
    supplierId: `SUP-${String((index % 30) + 1).padStart(3, '0')}`,
    unitCost: Math.round((5 + Math.random() * 1495) * 100) / 100,
    leadTimeDays: Math.floor(5 + Math.random() * 85),
  }
}

export const parts_catalog: Part[] = Array.from({ length: 1200 }, (_, i) => generatePart(i))
export default parts_catalog
