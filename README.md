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

Users can create a card, customize it with images and music, and share it through a unique link.

The application is deployed on Azure Static Web Apps and uses GitHub Actions for automated CI/CD.

## Live Demo

https://www.loviaforyou.com


<p align="center">
  <img src="./public/gif/create-preview.gif" width="340" alt="Create card">
  &nbsp;&nbsp;
  <img src="./public/gif/open-card.gif" width="340" alt="Open card">
</p>


# Architecture

```text
                 GitHub
                    │
                    ▼
          GitHub Actions CI/CD

          Lint → Test → Build
                    │
                    ▼
        Azure Static Web Apps
                    │
                    ▼
             Next.js Application
                    │
                    ▼
               Supabase
```

# Features

- Create personalized digital cards
- Upload custom images
- Add optional background music
- Generate shareable card links
- View card status
- Basic API rate limiting


# Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 14 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase |
| Hosting | Azure Static Web Apps |
| Containers | Docker |
| CI/CD | GitHub Actions |
| Testing | Jest |


# Project Structure

```text
lovia/
├── .github/
│   └── workflows/
├── app/
│   ├── api/
│   ├── card/
│   └── ideas/
├── components/
├── lib/
├── public/
├── Dockerfile
├── docker-compose.yml
├── README.md
└── LICENSE
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

Configure the required variables.

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

Start the development server.

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

# Running with Docker

Build and start the application.

```bash
docker compose up --build
```

The application will be available at:

```
http://localhost:3000
```

# Environment Variables

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase project URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase anonymous key |

# API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/cards` | Create a new card |
| GET | `/api/status` | Application health check |

# Testing

Run the test suite.

```bash
npm test
```

The test suite validates:

- Music selection logic
- Animal selection logic
- Card creation endpoint validation

# CI/CD

Every push and pull request runs the GitHub Actions CI pipeline.

The workflow performs:

1. Install dependencies
2. Run ESLint
3. Execute tests
4. Build the application

Pushes to the `main` branch trigger an automated deployment to Azure Static Web Apps.


# Deployment

The application is deployed using:

- GitHub Actions
- Azure Static Web Apps

Deployment flow:

```text
Push to main

↓

GitHub Actions

↓

Lint → Test → Build

↓

Azure Static Web Apps Deployment
```

# Future Improvements

- User authentication
- Additional card themes
- More customization options
- Email sharing

# License

This project is licensed under the MIT License.

See the LICENSE file for details.