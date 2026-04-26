import { withSentryConfig } from "@sentry/nextjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
}

export default withSentryConfig(nextConfig, {
  org: "fabricio-farro",
  project: "lovia",
  silent: !process.env.CI,
  widenClientFileUpload: true,
})
