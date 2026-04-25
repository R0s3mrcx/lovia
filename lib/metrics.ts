import { Registry, Counter, Gauge, collectDefaultMetrics } from "prom-client"

const g = globalThis as typeof globalThis & {
  __lovia_registry?: Registry
  __lovia_initialized?: boolean
  __lovia_cardsCreatedTotal?: Counter<string>
  __lovia_httpRequestsTotal?: Counter<string>
  __lovia_activeCardsGauge?: Gauge<string>
}

if (!g.__lovia_registry) {
  g.__lovia_registry = new Registry()
}
export const register = g.__lovia_registry

if (!g.__lovia_initialized) {
  collectDefaultMetrics({ register })
  g.__lovia_initialized = true
}

if (!g.__lovia_cardsCreatedTotal) {
  g.__lovia_cardsCreatedTotal = new Counter({
    name: "lovia_cards_created_total",
    help: "Total cards created",
    labelNames: ["animal_theme"],
    registers: [register],
  })
}
export const cardsCreatedTotal = g.__lovia_cardsCreatedTotal

if (!g.__lovia_httpRequestsTotal) {
  g.__lovia_httpRequestsTotal = new Counter({
    name: "lovia_http_requests_total",
    help: "Total HTTP requests",
    labelNames: ["method", "path", "status_code"],
    registers: [register],
  })
}
export const httpRequestsTotal = g.__lovia_httpRequestsTotal

if (!g.__lovia_activeCardsGauge) {
  g.__lovia_activeCardsGauge = new Gauge({
    name: "lovia_active_cards",
    help: "Active cards in the database",
    registers: [register],
  })
}
export const activeCardsGauge = g.__lovia_activeCardsGauge
