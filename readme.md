# ❤️ Lovia — Magical Love Cards

![React](https://img.shields.io/badge/react-18-61DAFB?logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)
![Supabase](https://img.shields.io/badge/supabase-DB-3ECF8E?logo=supabase&logoColor=white)
![Next.js](https://img.shields.io/badge/next.js-13+-000000?logo=nextdotjs&logoColor=white)
![Azure](https://img.shields.io/badge/azure-static%20web%20apps-0078D4?logo=microsoftazure&logoColor=white)

---

## 📌 Overview

Lovia is a modern web application that allows users to create and share digital love cards through short links.  
It is built with **Next.js**, powered by **Supabase**, and deployed automatically using **GitHub Actions** to **Azure Static Web Apps**.

🌐 Live: https://www.loviaforyou.com

---

## 🏗️ Architecture

```

┌──────────────┐
│    User      │
└──────┬───────┘
       │
       ▼
┌────────────────────────┐
│  Next.js (App Router)  │
│  Azure Static Web App  │
└──────────┬─────────────┘
           │
           ▼
┌────────────────────────┐
│     Supabase            │
│  Postgres + REST API    │
└────────────────────────┘

```

---

## 🚀 Features

- ✨ Create digital love cards with personalized messages  
- 🐰 Cute animal-based visual themes  
- 🔗 Shareable short links (e.g. `/card/abcd12`)  
- 📦 Supabase-powered storage  
- ⚙️ CI/CD with GitHub Actions  
- 🌐 Custom domain with HTTPS  

---

## 🧱 Tech Stack

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| Frontend           | Next.js (App Router, React)         |
| Styling            | Tailwind CSS                        |
| Backend / Database | Supabase (PostgreSQL)               |
| Hosting            | Azure Static Web Apps               |
| CI/CD              | GitHub Actions                      |

---

## 🧠 Architecture Overview

- The frontend is statically deployed on **Azure Static Web Apps**
- Dynamic content is stored and fetched from **Supabase**
- Each card is identified by a short ID
- GitHub Actions handles build and deployment automatically

This setup keeps hosting simple, scalable, and cost-effective.

---

## 🔧 Local Development

```bash
git clone https://github.com/R0s3mrcx/lovia.git
cd lovia
npm install
cp .env.local.example .env.local
npm run dev
```
---

## 🔑 Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url 
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

These variables must also be configured in Azure Static Web Apps.

---

## 🚢 Deployment

- Automatic deployment via GitHub Actions
- Triggered on push to main
- Hosted on Azure Static Web Apps
- Supabase handles dynamic data independently

---

## 📜 License

This project is source-available.

The code is publicly accessible for educational and portfolio purposes,
but commercial use, redistribution, or cloning for profit is not permitted
without explicit permission from the author.

See the LICENSE file for details.

