# Lovia 💖

![CI](https://github.com/R0s3mrcx/lovia/actions/workflows/ci.yml/badge.svg)
![Deploy](https://github.com/R0s3mrcx/lovia/actions/workflows/deploy.yml/badge.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white)
![Azure Static Web Apps](https://img.shields.io/badge/Azure_Static_Web_Apps-0078D4?logo=microsoftazure&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white)
![License](https://img.shields.io/github/license/R0s3mrcx/lovia)

Lovia is a web application for creating and sharing personalized digital cards.

The project combines Next.js, Supabase, Docker, GitHub Actions, and Azure Static Web Apps into a modern full-stack web application.

## Live Demo

https://www.loviaforyou.com


<p align="center">
  <img src="./public/gif/create-preview.gif" width="340" alt="Create card">
  &nbsp;&nbsp;
  <img src="./public/gif/open-card.gif" width="340" alt="Open card">
</p>

# Architecture

```text
Developer
     │
     ▼
 GitHub
     │
     ▼
GitHub Actions
     │
     ▼
Azure Static Web Apps
     │
     ▼
 Next.js
     │
     ▼
 Supabase
```

# Features

- Create personalized digital cards
- Upload custom images
- Optional background music
- Share cards using unique URLs
- Card status page
- Basic API rate limiting

# Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js Route Handlers |
| Database | Supabase |
| Hosting | Azure Static Web Apps |
| Container | Docker |
| CI/CD | GitHub Actions |
| Testing | Jest |


# Project Structure

```text
.
├── app/
├── components/
├── lib/
├── public/
├── __tests__/
├── .github/
│   └── workflows/
├── Dockerfile
├── docker-compose.yml
├── package.json
└── README.md
```

# Requirements

- Node.js 20+
- npm
- Docker (optional)
- Supabase project

# Local Development

Clone the repository.

```bash
git clone https://github.com/R0s3mrcx/lovia.git
cd lovia
```

Install dependencies.

```bash
npm install
```

Create the environment file.

```bash
cp .env.example .env
```

Run the application.

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

# Docker

Build and start the application.

```bash
docker compose up --build
```

Open:

```
http://localhost:3000
```

# Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |

# API

## Create Card

```http
POST /api/cards
```

Creates a new digital card.

## Health Check

```http
GET /api/status
```

Returns the application health status.

# Testing

Run all tests.

```bash
npm test
```

The CI pipeline executes:

- Lint
- Tests
- Production build

# Deployment

Every push to the `main` branch automatically deploys the application to Azure Static Web Apps using GitHub Actions.

# License

This project is licensed under the MIT License.

See the LICENSE file for details.
