# Lovia 💖

![Next.js](https://img.shields.io/badge/next.js-14-000000?logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/typescript-5-3178C6?logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-postgres-3ECF8E?logo=supabase&logoColor=white)
![Azure](https://img.shields.io/badge/azure-static%20web%20apps-0078D4?logo=microsoftazure&logoColor=white)
![Docker](https://img.shields.io/badge/docker-multi--stage-2496ED?logo=docker&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-orchestration-326CE5?logo=kubernetes&logoColor=white)
![Terraform](https://img.shields.io/badge/terraform-IaC-7B42BC?logo=terraform&logoColor=white)
![Prometheus](https://img.shields.io/badge/prometheus-metrics-E6522C?logo=prometheus&logoColor=white)
![Grafana](https://img.shields.io/badge/grafana-dashboards-F46800?logo=grafana&logoColor=white)
![Sentry](https://img.shields.io/badge/sentry-monitoring-362D59?logo=sentry&logoColor=white)
![Tests](https://img.shields.io/badge/tests-17%20passing-brightgreen)
![Deploy](https://github.com/R0s3mrcx/lovia/actions/workflows/deploy.yml/badge.svg)

Cloud-native application for creating and sharing digital love cards — with cute companions, background music, and a personalized message — all through a single shareable link. No account required.

Deployed on Azure Static Web Apps with a full DevOps stack: CI/CD pipelines, infrastructure as code, containerization, observability, and Kubernetes orchestration.

🌐 **Live:** https://www.loviaforyou.com

---

<p align="center">
  <img src="./public/gif/create-preview.gif" alt="Creating a card" width="340">
  &nbsp;&nbsp;
  <img src="./public/gif/open-card.gif" alt="Opening a card" width="340">
</p>

---

## Features

- **Cute companions** — pick from classic animals or seasonal characters (Christmas, Halloween, Birthday, BFF)
- **Custom photo** — upload your own image instead of the default animal
- **Background music** — choose a mood: Romantic, Dreamy, or Happy
- **Shareable link** — every card gets a unique short URL (e.g. `/card/abc123`)
- **Open tracking** — see when your card was opened via the status page
- **Open Graph previews** — cards look great when shared on WhatsApp, iMessage, Instagram
- **Rate limiting** — middleware protects the API from spam (5 cards/IP/minute)
- **Analytics** — `card_created`, `card_opened`, `share_copied` events via Vercel Analytics
- **No signup** — create and share in under a minute, completely free

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router, React 18) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL + Storage) |
| Analytics | Vercel Analytics |
| Hosting | Azure Static Web Apps |
| CI/CD | GitHub Actions (staging → production with manual approval) |
| Tests | Jest (17 passing) |
| Containerization | Docker (multi-stage build) · Docker Compose |
| Orchestration | Kubernetes (Deployment, Service, HPA) · minikube |
| Infrastructure | Terraform (Azure IaC) |
| Metrics | Prometheus + Grafana |
| Error tracking | Sentry (errors + performance traces) |

---

## Architecture

```
                    ┌─────────────────────────┐
                    │   GitHub Actions CI/CD  │
                    │  lint → test → build    │
                    │  staging → production   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │  Azure Static Web Apps  │
                    │   loviaforyou.com        │
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              │                  │                  │
   ┌──────────▼─────┐  ┌────────▼───────┐  ┌──────▼──────┐
   │    Supabase    │  │   Prometheus   │  │   Sentry    │
   │  (PostgreSQL)  │  │  + Grafana     │  │  (errors +  │
   │                │  │  (metrics)     │  │   traces)   │
   └────────────────┘  └────────────────┘  └─────────────┘
```

**Request flow:**

```
Browser
  │
  ├── GET  /card/[id]   → Next.js Server Component → Supabase (read card)
  ├── POST /api/cards   → Next.js Route Handler    → Supabase (write card)
  │         ↑                                       → Prometheus counter++
  │     Middleware (rate limiting: 5 req/IP/min)
  │
  ├── GET  /api/metrics → Prometheus scrape endpoint
  └── GET  /api/status  → Healthcheck (Docker + Kubernetes probes)
```

Card data is stored in a `cards` table. Photos are uploaded to a Supabase Storage bucket and served via public CDN URL. Each card is identified by a 6-character random ID. The `opened_at` timestamp is written on first view, enabling open tracking.

---

## Local Development

**Prerequisites:** Node 20, Docker Desktop

```bash
git clone https://github.com/R0s3mrcx/lovia.git
cd lovia
npm install
cp .env.example .env
# fill in your credentials
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Running with Docker

Runs the full observability stack locally: app + Prometheus + Grafana.

```bash
docker compose up --build

# App:        http://localhost:3000
# Grafana:    http://localhost:3001  (admin / lovia-admin-2024)
# Prometheus: http://localhost:9090
```

---

## Kubernetes

Manifests include Deployment, Service, and HorizontalPodAutoscaler. Tested with minikube locally.

```bash
# Start local cluster
minikube start --driver=docker

# Create secrets
kubectl create secret generic lovia-secrets \
  --from-literal=supabase-url="YOUR_URL" \
  --from-literal=supabase-anon-key="YOUR_KEY"

# Deploy
kubectl apply -f k8s/deployment.yml

# Verify — 2 pods running with liveness + readiness probes
kubectl get pods,services,hpa

# Open in browser
minikube service lovia-service
```

The HPA scales from 2 to 4 replicas automatically when CPU exceeds 70%.

---

## CI/CD Pipeline

| Workflow | Trigger | Steps |
|---|---|---|
| `ci.yml` | Every push / PR | Lint → Test → Build |
| `deploy.yml` | Push to `main` | Staging → Manual approval → Production |

The `production` GitHub environment requires reviewer approval before deploying.

---

## Observability

**Custom Prometheus metrics** exposed at `/api/metrics`:

| Metric | Type | Description |
|---|---|---|
| `lovia_cards_created_total` | Counter | Cards created, labeled by `animal_theme` |
| `lovia_http_requests_total` | Counter | HTTP requests by method, path, status code |
| `lovia_active_cards` | Gauge | Active cards in the database |

Plus default Node.js metrics: heap usage, CPU, event loop lag, garbage collection.

**Grafana dashboard** (`monitoring/lovia-dashboard.json`) — import directly into Grafana for real-time panels on card creation rate, HTTP errors, memory, CPU, event loop lag, and GC time.

**Sentry** captures unhandled errors and performance traces across client and server, with source maps uploaded on every deploy.

---

## Infrastructure as Code

Terraform provisions the full Azure infrastructure:

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
terraform init
terraform plan
terraform apply
```

Resources created: Resource Group, Azure Static Web App, Log Analytics Workspace, Application Insights, Key Vault.

---

## API

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/cards` | Create a card (rate limited: 5/min per IP) |
| `GET` | `/api/status` | Healthcheck — used by Docker and Kubernetes probes |
| `GET` | `/api/metrics` | Prometheus scrape endpoint |
| `GET` | `/api/og` | Open Graph image generation |

---

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

---

## Supabase Setup

**Database — `cards` table:**

```sql
create table cards (
  id          text primary key,
  animal      text not null,
  "to"        text not null,
  "from"      text not null,
  message     text not null,
  music       text default 'none',
  image_url   text,
  opened_at   timestamptz,
  created_at  timestamptz default now()
);
```

**Storage — `card-images` bucket:**
1. Create a bucket named `card-images` and set it to **Public**
2. Add a Storage Policy: operation `INSERT`, role `anon`, definition `true`

---

## Music

Drop three royalty-free MP3s into `/public/music/`:

```
public/
  music/
    romantic.mp3
    dreamy.mp3
    happy.mp3
```

Pixabay Music is a good source — no attribution required. The app degrades gracefully if the files are missing.

---

## Testing

```bash
npm test            # run all tests
npm run test:watch  # watch mode
```

17 unit and integration tests covering:

- `getAnimalById` — correct lookup, unknown IDs, uniqueness invariants
- `getMusicById` — correct lookup, mp3 path format, options structure
- `timeAgo` — all time ranges, singular/plural edge cases
- `POST /api/cards` — valid payload, missing fields, input length validation (Supabase mocked)

---

## Project Structure

```
lovia/
├── app/
│   ├── api/
│   │   ├── cards/         # Card creation API + Prometheus metrics
│   │   ├── metrics/       # Prometheus scrape endpoint
│   │   ├── status/        # Healthcheck endpoint (Docker + K8s probes)
│   │   └── og/            # Open Graph image generation
│   ├── card/[id]/         # Card view page
│   └── ideas/             # Message ideas page
├── components/            # UI components
├── lib/
│   ├── metrics.ts         # Prometheus registry (singleton pattern)
│   └── supabase.ts        # Supabase client (lazy initialization)
├── k8s/                   # Kubernetes manifests (Deployment, Service, HPA)
├── monitoring/            # Prometheus + Grafana configuration
├── terraform/             # Azure infrastructure as code
├── .github/workflows/     # CI/CD pipelines
├── Dockerfile             # Multi-stage build (Node 20 Alpine)
└── docker-compose.yml     # Local stack with full observability
```

---

## Deployment

Any push to `main` triggers the GitHub Actions workflow:
1. Lint, test, and build
2. Deploy to staging automatically
3. Wait for manual approval
4. Deploy to production

---

## License

Source-available. Public for educational and portfolio purposes. Commercial use or redistribution without explicit permission from the author is not permitted. See [LICENSE](./LICENSE) for details.
