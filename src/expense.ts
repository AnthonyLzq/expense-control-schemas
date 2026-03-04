import z from 'zod'
import { tagOnExpense } from './tag'

const expense = z.object({
  id: z.number(),
  userId: z.number(),
  emailId: z.string(),
  emailDate: z.string(),
  transactionDate: z.string().nullable(),
  subject: z.string(),
  from: z.string(),
  amount: z.number(),
  currency: z.string(),
  merchant: z.string().nullable(),
  category: z.string().nullable(),
  cardLast4: z.string().nullable(),
  cardId: z.number().nullable(),
  description: z.string().nullable(),
  source: z.enum(['EMAIL', 'MANUAL']),
  suspicious: z.boolean(),
  suspiciousReason: z.enum(['POSSIBLE_DUPLICATE']).nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  tags: z.array(tagOnExpense).optional(),
})
type ExpenseDTO = z.infer<typeof expense>

const createManualExpense = z.object({
  amount: z.number().positive(),
  currency: z.string().min(1).default('PEN'),
  merchant: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  cardId: z.number().int().positive().nullable().optional(),
  date: z.iso.datetime(),
  force: z.boolean().default(false),
})
type CreateManualExpense = z.infer<typeof createManualExpense>

const duplicateExpenseResponse = z.object({
  code: z.string(),
  existingExpense: z.object({
    id: z.number(),
    amount: z.number(),
    merchant: z.string().nullable(),
    date: z.string(),
  }),
  hint: z.string(),
})
type DuplicateExpenseResponse = z.infer<typeof duplicateExpenseResponse>

export {
  createManualExpense, type CreateManualExpense,
  duplicateExpenseResponse, type DuplicateExpenseResponse,
  expense, type ExpenseDTO,
}
