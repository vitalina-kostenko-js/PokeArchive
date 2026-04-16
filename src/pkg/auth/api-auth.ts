import { NextRequest } from 'next/server'

import { getBearerPayload } from '@/pkg/auth/bearer-token'
import { getSessionPayloadFromRequest } from '@/pkg/auth/session-from-request'

export const getAuthenticatedUser = async (req: NextRequest) => {
  const payload = (await getBearerPayload(req)) ?? (await getSessionPayloadFromRequest(req))
  if (!payload?.id) return null
  return { id: payload.id as string, email: payload.email as string }
}

