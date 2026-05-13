import { createHash } from 'crypto'
import { v4 as uuidv4 } from 'uuid'

export interface Subscriber {
  email: string
  name?: string
  token: string
  active: boolean
  subscribedAt: Date
}

export function hashEmail(email: string): string {
  return createHash('sha256').update(email.toLowerCase().trim()).digest('hex').slice(0, 32)
}

export function createSubscriber(email: string, name?: string): Omit<Subscriber, 'subscribedAt'> & { subscribedAt: Date } {
  const subscriber: Omit<Subscriber, 'subscribedAt'> & { subscribedAt: Date } = {
    email: email.toLowerCase().trim(),
    token: uuidv4(),
    active: true,
    subscribedAt: new Date(),
  }
  if (name) subscriber.name = name
  return subscriber
}
