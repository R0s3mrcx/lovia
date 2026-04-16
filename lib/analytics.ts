type EventName =
  | "card_created"
  | "card_opened"
  | "share_copied"
  | "share_native"
  | "status_viewed"
  | "card_saved"

type EventProps = Record<string, string | number | boolean>

export function track(event: EventName, props?: EventProps): void {
  if (typeof window === "undefined") return

  // @vercel/analytics track (already in package.json)
  if ("va" in window && typeof (window as { va?: Function }).va === "function") {
    ;(window as { va: Function }).va("event", { name: event, ...props })
  }

  // Always log in dev so you can verify events fire
  if (process.env.NODE_ENV === "development") {
    console.info(`[analytics] ${event}`, props ?? "")
  }
}
