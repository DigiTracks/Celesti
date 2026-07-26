import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Wrench, AlertTriangle, CheckCircle } from 'lucide-react'
import StatusBadge from '@/components/common/StatusBadge'
import type { StatusBadgeProps } from '@/components/common/StatusBadge'
import TelemetryCard from '@/components/common/TelemetryCard'
import EnterpriseDataTable from '@/components/common/EnterpriseDataTable'
import ActionDrawer from '@/components/common/ActionDrawer'
import PainPointBanner from '@/components/common/PainPointBanner'
import { workOrders } from '@/json/work_orders'
import { useMfgStore } from '@/stores/useMfgStore'
import { useQualityStore } from '@/stores/useQualityStore'
import type { WorkOrder, TelemetryReading } from '@/types'

const statusMap: Record<string, StatusBadgeProps['variant']> = {
  released: 'in_progress',
  in_progress: 'in_progress',
  on_hold: 'hold',
  completed: 'completed',
  failed: 'failed',
}

const woColumns = [
  {
    key: 'woNumber',
    header: 'WO #',
    sortable: true,
    render: (r: WorkOrder) => <span className="font-mono text-xs text-blue-400">{r.woNumber}</span>,
  },
  {
    key: 'assignedOperator',
    header: 'Operator',
    sortable: true,
    render: (r: WorkOrder) => <span className="text-xs text-text-muted">{r.assignedOperator}</span>,
  },
  {
    key: 'quantity',
    header: 'Qty',
    sortable: true,
    render: (r: WorkOrder) => (
      <span className="font-mono text-xs">
        {r.quantityCompleted}/{r.quantity}
      </span>
    ),
  },
  {
    key: 'priority',
    header: 'Priority',
    sortable: true,
    render: (r: WorkOrder) => {
      const colors: Record<string, string> = {
        critical: 'text-red-fail',
        expedite: 'text-amber-ops',
        routine: 'text-text-muted',
      }
      return (
        <span className={`text-[10px] uppercase font-mono ${colors[r.priority] ?? ''}`}>
          {r.priority}
        </span>
      )
    },
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (r: WorkOrder) => (
      <StatusBadge
        label={r.status.replace('_', ' ').toUpperCase()}
        variant={statusMap[r.status] ?? 'in_progress'}
        pulse={r.status === 'in_progress'}
      />
    ),
  },
  {
    key: 'dueDate',
    header: 'Due',
    sortable: true,
    render: (r: WorkOrder) => (
      <span className="text-xs font-mono text-text-muted">{r.dueDate}</span>
    ),
  },
]

const ShopFloorPage: React.FC = () => {
  const { selectedWO, selectWO, updateStep, setWorkOrders } = useMfgStore()
  const { addNCR } = useQualityStore()
  const [telemetry, setTelemetry] = useState<TelemetryReading>({
    facilityId: 'FAC-BLR-01',
    particleCount05um: 2850,
    temperatureC: 20.4,
    relativeHumidityPct: 44.2,
    timestamp: new Date().toISOString(),
  })

  useEffect(() => {
    setWorkOrders(workOrders)
  }, [setWorkOrders])

  useEffect(() => {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker(new URL('@/simulation/telemetryWorker.ts', import.meta.url), {
        type: 'module',
      })
      worker.onmessage = (e) => {
        if (e.data.type === 'TELEMETRY_TICK') {
          setTelemetry(e.data.payload)
        }
      }
      worker.postMessage('start')
      return () => worker.terminate()
    }
  }, [])

  const handleCompleteStep = () => {
    if (!selectedWO) return
    const nextStep = selectedWO.steps.find(
      (s) => s.status === 'pending' || s.status === 'in_progress',
    )
    if (!nextStep) return
    updateStep(selectedWO.id, nextStep.stepNumber, {
      status: 'completed',
      completedBy: selectedWO.assignedOperator,
      completedAt: new Date().toISOString(),
    })
  }

  const handleTorqueFail = () => {
    if (!selectedWO) return
    addNCR({
      id: `NCR-${Date.now()}`,
      ncrNumber: `NCR-2025-${String(8000 + Math.floor(Math.random() * 1000))}`,
      woId: selectedWO.id,
      partId: selectedWO.partId,
      clause: 'AS9100D Clause 8.7 — Nonconforming Outputs',
      severity: 'major',
      status: 'open',
      description: `Torque out-of-spec on WO ${selectedWO.woNumber} step 5 — value exceeded 8.2 N·m limit`,
      raisedBy: 'System Auto-Raise',
      raisedAt: new Date().toISOString(),
    })
    updateStep(selectedWO.id, 5, { status: 'failed', torqueActual: 9.7 })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-text-main">Shop Floor Execution Terminal</h1>
        <p className="text-xs text-text-muted mt-1">
          Cleanroom AIT — ISO-8 Environment · Bengaluru Facility
        </p>
      </div>

      <PainPointBanner
        pain="Cleanroom particle counts logged manually twice per shift — excursions detected hours after occurrence. Torque tools not integrated with digital travelers. Out-of-spec fastenings discovered during final inspection, causing costly rework."
        solution="Live ISO-8 particle, temperature, and humidity monitoring via Web Worker with 3-second updates. Smart torque tools stream readings to e-Traveler steps in real time. Out-of-spec torque auto-locks the WO and raises an AS9100D NCR instantly."
        impact="Hours to detect → 3-second response"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TelemetryCard
          sensorName="ISO-8 Particle Count (0.5µm)"
          value={telemetry.particleCount05um}
          unit="p/m³"
          targetRange={[2600, 3520]}
          isCompliant={telemetry.particleCount05um < 3200}
        />
        <TelemetryCard
          sensorName="Cleanroom Temperature"
          value={telemetry.temperatureC}
          unit="°C"
          targetRange={[19.5, 21.5]}
          isCompliant={telemetry.temperatureC >= 19.5 && telemetry.temperatureC <= 21.5}
        />
        <TelemetryCard
          sensorName="Relative Humidity"
          value={telemetry.relativeHumidityPct}
          unit="%"
          targetRange={[40, 50]}
          isCompliant={telemetry.relativeHumidityPct >= 40 && telemetry.relativeHumidityPct <= 50}
        />
      </div>

      <div className="card-gradient p-4 space-y-3">
        <h2 className="text-sm font-semibold text-text-main flex items-center gap-2">
          <Wrench className="w-4 h-4 text-blue-400" />
          Active Work Orders — Cleanroom Line A
        </h2>
        <EnterpriseDataTable
          data={workOrders.filter((wo) => wo.status === 'in_progress' || wo.status === 'released')}
          columns={woColumns}
          onRowClick={(row) => selectWO(row)}
          pageSize={8}
        />
      </div>

      <ActionDrawer
        isOpen={!!selectedWO}
        onClose={() => selectWO(null)}
        title={`WO ${selectedWO?.woNumber ?? ''}`}
        subtitle={`Operator: ${selectedWO?.assignedOperator ?? ''} · ${selectedWO?.priority.toUpperCase()} Priority`}
      >
        {selectedWO && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <StatusBadge
                label={selectedWO.status.replace('_', ' ').toUpperCase()}
                variant={statusMap[selectedWO.status] ?? 'in_progress'}
                pulse={selectedWO.status === 'in_progress'}
              />
              <span className="text-xs text-text-muted font-mono">
                {selectedWO.quantityCompleted}/{selectedWO.quantity} completed
              </span>
            </div>
            <div className="space-y-2" data-tour="torque-input">
              {selectedWO.steps.map((step) => (
                <motion.div
                  key={step.stepNumber}
                  layout
                  className={`p-3 rounded-lg border transition-all ${
                    step.status === 'completed'
                      ? 'border-emerald-500/20 bg-emerald-500/5'
                      : step.status === 'failed'
                        ? 'border-red-500/30 bg-red-500/10'
                        : step.status === 'in_progress'
                          ? 'border-blue-500/30 bg-blue-500/5'
                          : 'border-border-subtle bg-slate-900/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      {step.status === 'completed' ? (
                        <CheckCircle className="w-4 h-4 text-emerald-pass mt-0.5" />
                      ) : step.status === 'failed' ? (
                        <AlertTriangle className="w-4 h-4 text-red-fail mt-0.5" />
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full border-2 mt-0.5 ${step.status === 'in_progress' ? 'border-blue-400 border-t-transparent animate-spin' : 'border-slate-700'}`}
                        />
                      )}
                      <div>
                        <p className="text-xs font-medium text-text-main">
                          Step {step.stepNumber}: {step.name}
                        </p>
                        {step.torqueTarget && (
                          <p className="text-[10px] font-mono text-text-muted mt-0.5">
                            Torque: {step.torqueActual?.toFixed(2) ?? '—'} / {step.torqueTarget}{' '}
                            {step.torqueUnit}
                            {step.torqueActual && step.torqueActual > step.torqueTarget * 1.1 && (
                              <span className="text-red-fail ml-1">OUT OF SPEC</span>
                            )}
                          </p>
                        )}
                        {step.completedBy && (
                          <p className="text-[10px] text-text-muted mt-0.5">
                            ✓ {step.completedBy}{' '}
                            {step.completedAt
                              ? new Date(step.completedAt).toLocaleDateString()
                              : ''}
                          </p>
                        )}
                      </div>
                    </div>
                    <StatusBadge
                      label={step.status.replace('_', ' ').toUpperCase()}
                      variant={
                        step.status === 'completed'
                          ? 'completed'
                          : step.status === 'failed'
                            ? 'failed'
                            : step.status === 'in_progress'
                              ? 'in_progress'
                              : 'hold'
                      }
                      pulse={step.status === 'in_progress'}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCompleteStep}
                disabled={
                  !selectedWO?.steps.some(
                    (s) => s.status === 'pending' || s.status === 'in_progress',
                  )
                }
                className="flex-1 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-pass hover:bg-emerald-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Complete Next Step
              </button>
              <button
                onClick={handleTorqueFail}
                className="flex-1 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-xs font-medium text-red-fail hover:bg-red-500/20 transition-all"
              >
                Simulate Torque Failure
              </button>
            </div>
          </div>
        )}
      </ActionDrawer>
    </div>
  )
}

export default ShopFloorPage
