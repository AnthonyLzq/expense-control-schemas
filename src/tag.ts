import z from 'zod'

const tagOnExpense = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable(),
  icon: z.string().nullable(),
})
type TagOnExpense = z.infer<typeof tagOnExpense>

const tag = z.object({
  id: z.number(),
  name: z.string(),
  color: z.string().nullable(),
  icon: z.string().nullable(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
type TagDTO = z.infer<typeof tag>

const tagList = z.array(tag)
type TagListDTO = z.infer<typeof tagList>

const createTag = z.object({
  name: z.string().min(1).max(50),
  color: z.string().max(7).nullable().optional(),
  icon: z.string().max(50).nullable().optional(),
})
type CreateTag = z.infer<typeof createTag>

const updateTag = z.object({
  name: z.string().min(1).max(50).optional(),
  color: z.string().max(7).nullable().optional(),
  icon: z.string().max(50).nullable().optional(),
})
type UpdateTag = z.infer<typeof updateTag>

const assignTags = z.object({
  tagIds: z.array(z.number().int().positive()).min(1),
})
type AssignTags = z.infer<typeof assignTags>

export {
  assignTags, type AssignTags,
  createTag, type CreateTag,
  tag, type TagDTO,
  tagList, type TagListDTO,
  tagOnExpense, type TagOnExpense,
  updateTag, type UpdateTag,
}
