import type { TourStep } from '@/types'

export const EXECUTIVE_TOUR_STEPS: TourStep[] = [
  {
    targetRoute: '/',
    targetElementSelector: '[data-tour="hero-stats"]',
    title: 'Enterprise Platform Overview',
    content:
      'Celesti provides real-time operational visibility across 3 strategic facilities in Hyderabad, Bengaluru, and Thiruvananthapuram managing 450+ active work orders across 20 space & defense programs.',
  },
  {
    targetRoute: '/executive',
    targetElementSelector: '[data-tour="facility-grid"]',
    title: 'Multi-Facility Mission Control',
    content:
      'Executive dashboard displays OEE, FPY, and throughput across all centers of excellence with drill-down capability to individual cleanrooms and work orders.',
  },
  {
    targetRoute: '/shop-floor',
    targetElementSelector: '[data-tour="torque-input"]',
    title: 'Calibrated Tool & Poka-Yoke Interlock',
    content:
      'Smart torque tools stream readings directly to digital travelers. Out-of-spec torque values automatically lock the work order and raise an AS9100D Non-Conformance Report.',
  },
  {
    targetRoute: '/quality',
    targetElementSelector: '[data-tour="ncr-table"]',
    title: 'Automated AS9100D Non-Conformance Creation',
    content:
      'Shop floor failures instantly raise draft NCR records tagged under AS9100D Clause 8.7 with automated CAPA workflow and MRB disposition tracking.',
  },
  {
    targetRoute: '/inventory',
    targetElementSelector: '[data-tour="inventory-stats"]',
    title: 'Complete Parts Catalog & Inventory Control',
    content:
      'Browse 1,200 controlled part numbers across 6 categories with lifecycle tracking, supplier links, and real-time stock visibility.',
  },
  {
    targetRoute: '/digital-thread',
    targetElementSelector: '[data-tour="bom-diff"]',
    title: 'PLM-to-MES Digital Thread Alignment',
    content:
      'Side-by-side EbOM to MbOM visual reconciliation eliminates configuration drift and prevents assembly against outdated engineering revisions.',
  },
  {
    targetRoute: '/supply-chain',
    targetElementSelector: '[data-tour="genealogy-graph"]',
    title: 'Back-to-Birth Material Lineage',
    content:
      'Trace every flight-critical component back to supplier Mill Test Reports and AS9163 Certificates of Conformity in under 3 seconds.',
  },
  {
    targetRoute: '/analytics',
    targetElementSelector: '[data-tour="spc-chart"]',
    title: 'Statistical Process Control',
    content:
      'Real-time SPC charts with Cpk/Ppk analysis, control limits, and automated alerting for process drift beyond ±3σ.',
  },
  {
    targetRoute: '/architecture',
    targetElementSelector: '[data-tour="arch-canvas"]',
    title: 'Enterprise Architecture Explorer',
    content:
      'Interactive graph visualization of the complete Celesti platform architecture spanning PLM, MES, QMS, and ERP integrations across 4 layers.',
  },
  {
    targetRoute: '/procedures',
    targetElementSelector: '[data-tour="copilot-chat"]',
    title: 'Offline Procedures & Knowledge Base',
    content:
      'Searchable repository of AS9100D clauses, work instructions, quality procedures, and safety protocols — all bundled locally, no network required.',
  },
]
