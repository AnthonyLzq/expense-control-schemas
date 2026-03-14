import z from 'zod'

const card = z.object({
  id: z.number(),
  last4: z.string(),
  defaultName: z.string(),
  label: z.string().nullable(),
  color: z.string().nullable(),
  closingDay: z.number().nullable(),
  parentCardId: z.number().nullable(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
type CardDTO = z.infer<typeof card>

const cardList = z.array(card)
type CardListDTO = z.infer<typeof cardList>

const createCard = z.object({
  last4: z.string().length(4).regex(/^\d{4}$/),
  defaultName: z.string().min(1).max(100),
  label: z.string().min(1).max(50).optional(),
  color: z.string().max(7).nullable().optional(),
})
type CreateCard = z.infer<typeof createCard>

const updateCard = z.object({
  label: z.string().min(1).max(50).optional(),
  color: z.string().max(7).nullable().optional(),
  closingDay: z.number().int().min(1).max(31).nullable().optional(),
  parentCardId: z.number().int().positive().nullable().optional(),
})
type UpdateCard = z.infer<typeof updateCard>

export {
  card, type CardDTO,
  cardList, type CardListDTO,
  createCard, type CreateCard,
  updateCard, type UpdateCard,
}
