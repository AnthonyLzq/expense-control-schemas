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
  merchant: z.string().max(100).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
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

const updateExpense = z.object({
  amount: z.number().positive().optional(),
  currency: z.string().min(1).optional(),
  merchant: z.string().max(100).nullable().optional(),
  description: z.string().max(500).nullable().optional(),
  date: z.iso.datetime().optional(),
  suspicious: z.boolean().optional(),
  tagIds: z.array(z.number().int().positive()).optional(),
})
type UpdateExpense = z.infer<typeof updateExpense>

const bulkDeleteExpenses = z.object({
  ids: z.array(z.number().int().positive()).min(1).max(50),
})
type BulkDeleteExpenses = z.infer<typeof bulkDeleteExpenses>

const mergeExpenses = z.object({
  expenseIds: z.array(z.number().int().positive()).min(2).max(10),
  merged: z.object({
    merchant: z.string().max(100).nullable().optional(),
    description: z.string().max(500).nullable().optional(),
    date: z.iso.datetime(),
    tagIds: z.array(z.number().int().positive()).optional(),
  }),
})
type MergeExpenses = z.infer<typeof mergeExpenses>

export {
  bulkDeleteExpenses,
  type BulkDeleteExpenses,
  createManualExpense,
  type CreateManualExpense,
  duplicateExpenseResponse,
  type DuplicateExpenseResponse,
  expense,
  type ExpenseDTO,
  mergeExpenses,
  type MergeExpenses,
  updateExpense,
  type UpdateExpense,
}
