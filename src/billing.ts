import z from 'zod'

const billingPeriod = z.object({
  id: z.number(),
  cardId: z.number(),
  periodStart: z.string(),
  periodEnd: z.string(),
  paymentDate: z.string(),
  year: z.number(),
  month: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
type BillingPeriodDTO = z.infer<typeof billingPeriod>

const billingPeriodList = z.array(billingPeriod)
type BillingPeriodListDTO = z.infer<typeof billingPeriodList>

const createBillingPeriod = z.object({
  periodStart: z.iso.datetime(),
  periodEnd: z.iso.datetime(),
  paymentDate: z.iso.datetime(),
  year: z.number().int().min(2020).max(2100),
  month: z.number().int().min(1).max(12),
})
type CreateBillingPeriod = z.infer<typeof createBillingPeriod>

const createBillingPeriods = z.object({
  periods: z.array(createBillingPeriod).min(1).max(12),
})
type CreateBillingPeriods = z.infer<typeof createBillingPeriods>

const updateBillingPeriod = z.object({
  periodStart: z.iso.datetime().optional(),
  periodEnd: z.iso.datetime().optional(),
  paymentDate: z.iso.datetime().optional(),
})
type UpdateBillingPeriod = z.infer<typeof updateBillingPeriod>

const generateBillingPeriods = z.object({
  closingDay: z.number().int().min(1).max(31),
  year: z.number().int().min(2020).max(2100),
})
type GenerateBillingPeriods = z.infer<typeof generateBillingPeriods>

const billingEstimateCurrencyTotal = z.object({
  currency: z.string(),
  total: z.number(),
  expenseCount: z.number(),
})

const billingEstimate = z.object({
  totals: z.array(billingEstimateCurrencyTotal),
  paymentDate: z.string().nullable(),
  periodEnd: z.string().nullable(),
  expenseCount: z.number(),
})
type BillingEstimateDTO = z.infer<typeof billingEstimate>

const billingSummaryCard = z.object({
  cardId: z.number(),
  cardName: z.string(),
  last4: z.string(),
  paymentDate: z.string(),
  totals: z.array(billingEstimateCurrencyTotal),
})

const billingSummary = z.object({
  totals: z.array(billingEstimateCurrencyTotal),
  paymentDateRange: z.object({
    earliest: z.string(),
    latest: z.string(),
  }),
  cards: z.array(billingSummaryCard),
  expenseCount: z.number(),
  cardCount: z.number(),
})
type BillingSummaryDTO = z.infer<typeof billingSummary>

export {
  billingPeriod, type BillingPeriodDTO,
  billingPeriodList, type BillingPeriodListDTO,
  createBillingPeriod, type CreateBillingPeriod,
  createBillingPeriods, type CreateBillingPeriods,
  updateBillingPeriod, type UpdateBillingPeriod,
  generateBillingPeriods, type GenerateBillingPeriods,
  billingEstimate, type BillingEstimateDTO,
  billingSummary, type BillingSummaryDTO,
}
