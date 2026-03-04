import z from 'zod'

const authUser = z.object({
  id: z.number(),
  email: z.string(),
  name: z.string(),
  lastName: z.string(),
})
type AuthUser = z.infer<typeof authUser>

const authResponse = z.object({
  accessToken: z.string(),
  refreshToken: z.string().optional(),
  expiresAt: z.string(),
  user: authUser,
})
type AuthResponse = z.infer<typeof authResponse>

export { authResponse, type AuthResponse, authUser, type AuthUser }
