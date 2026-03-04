import z from 'zod'

const syncStartedResponse = z.object({
  jobId: z.string(),
})
type SyncStartedResponse = z.infer<typeof syncStartedResponse>

const syncJobStatus = z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED'])
type SyncJobStatus = z.infer<typeof syncJobStatus>

const syncPhase = z.enum(['pending', 'listing', 'fetching', 'processing', 'done'])
type SyncPhase = z.infer<typeof syncPhase>

const syncStatusResponse = z.object({
  id: z.string(),
  status: syncJobStatus,
  phase: syncPhase,
  since: z.string(),
  totalMessages: z.number(),
  processedMessages: z.number(),
  newExpenses: z.number(),
  skipped: z.number(),
  progress: z.number().min(0).max(100),
  error: z.string().nullable(),
  startedAt: z.string(),
  completedAt: z.string().nullable(),
})
type SyncStatusResponse = z.infer<typeof syncStatusResponse>

export {
  syncJobStatus, type SyncJobStatus,
  syncPhase, type SyncPhase,
  syncStartedResponse, type SyncStartedResponse,
  syncStatusResponse, type SyncStatusResponse,
}
