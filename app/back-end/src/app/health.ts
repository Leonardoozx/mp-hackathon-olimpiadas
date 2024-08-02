import { DateTime } from 'luxon'

async function Healthcheck() {
  // Add connection checks here such as DB, Redis, RMQ, etc
  const connections: any[] = []

  const result = {
    uptime: process.uptime(),
    timestamp: DateTime.now().toISO(),
    connections,
  }

  return result
}

export { Healthcheck }