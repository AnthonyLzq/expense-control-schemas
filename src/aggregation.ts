import z from 'zod'

const metricEnum = z.enum(['sum', 'count', 'avg', 'min', 'max'])

const aggregateBody = z.object({
  groupBy: z.enum(['card', 'merchant', 'tag']).optional(),
  filters: z.object({
    from: z.iso.datetime().optional(),
    to: z.iso.datetime().optional(),
    cardIds: z.array(z.number().int().positive()).optional(),
    currency: z.string().optional(),
    merchants: z.array(z.string()).optional(),
    includeSuspicious: z.boolean().optional(),
    tagIds: z.array(z.number().int().positive()).optional(),
    groupExtensions: z.boolean().default(false).optional(),
  }).optional(),
  metrics: z.array(metricEnum).min(1),
  sort: z.object({
    field: metricEnum,
    order: z.enum(['asc', 'desc']),
  }).optional(),
})
type AggregateBody = z.infer<typeof aggregateBody>

const aggregateGroupItem = z.object({
  key: z.string().nullable(),
  keyId: z.number().nullable(),
  sum: z.number().optional(),
  count: z.number().optional(),
  avg: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
})
type AggregateGroupItem = z.infer<typeof aggregateGroupItem>

const aggregateTotals = z.object({
  sum: z.number().optional(),
  count: z.number().optional(),
  avg: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
})
type AggregateTotals = z.infer<typeof aggregateTotals>

const aggregateCurrencyResult = z.object({
  currency: z.string(),
  groups: z.array(aggregateGroupItem),
  totals: aggregateTotals,
})
type AggregateCurrencyResult = z.infer<typeof aggregateCurrencyResult>

const aggregateResponse = z.object({
  results: z.array(aggregateCurrencyResult),
  appliedFilters: z.record(z.string(), z.unknown()),
})
type AggregateResponse = z.infer<typeof aggregateResponse>

export {
  aggregateBody, type AggregateBody,
  aggregateCurrencyResult, type AggregateCurrencyResult,
  aggregateGroupItem, type AggregateGroupItem,
  aggregateResponse, type AggregateResponse,
  aggregateTotals, type AggregateTotals,
}
