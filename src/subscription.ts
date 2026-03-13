import z from 'zod'

const subscriptionProvider = z.enum(['adapty', 'revenuecat'])
type SubscriptionProvider = z.infer<typeof subscriptionProvider>

const subscriptionStatus = z.object({
  active: z.boolean(),
  productId: z.string().nullable(),
  expiresAt: z.string().nullable(),
  provider: subscriptionProvider.nullable(),
})
type SubscriptionStatus = z.infer<typeof subscriptionStatus>

const verifyPurchase = z.object({
  profileId: z.string().min(1),
})
type VerifyPurchase = z.infer<typeof verifyPurchase>

const subscriptionStatusResponse = z.object({
  error: z.boolean(),
  message: subscriptionStatus,
})
type SubscriptionStatusResponse = z.infer<typeof subscriptionStatusResponse>

const verifyPurchaseResponse = z.object({
  error: z.boolean(),
  message: z.object({
    active: z.boolean(),
    role: z.enum(['USER', 'USER_PREMIUM', 'ADMIN']),
  }),
})
type VerifyPurchaseResponse = z.infer<typeof verifyPurchaseResponse>

export {
  subscriptionProvider,
  type SubscriptionProvider,
  subscriptionStatus,
  type SubscriptionStatus,
  subscriptionStatusResponse,
  type SubscriptionStatusResponse,
  verifyPurchase,
  type VerifyPurchase,
  verifyPurchaseResponse,
  type VerifyPurchaseResponse,
}
