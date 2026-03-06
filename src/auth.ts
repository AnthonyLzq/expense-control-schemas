import z from 'zod'

const userRole = z.enum(['USER', 'USER_PREMIUM', 'ADMIN'])
type UserRole = z.infer<typeof userRole>

const authUser = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastName: z.string(),
  role: userRole,
})
type AuthUser = z.infer<typeof authUser>

const authResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.string(),
  user: authUser,
})
type AuthResponse = z.infer<typeof authResponse>

export {
  authResponse,
  type AuthResponse,
  authUser,
  type AuthUser,
  userRole,
  type UserRole,
}
