# Mini Project Management (mini-pm)

This repository is a scaffold for the **Mini Project Management System** screening task:
- Backend: Django + GraphQL (Graphene)
- Frontend: React + TypeScript + Vite + Apollo Client
- DB: PostgreSQL (docker-compose included)
- Styling: TailwindCSS

This archive contains a runnable scaffold designed for local development and further extension.

## Quick structure summary

```
mini-pm/
├── backend/
├── frontend/
├── docs/
└── README.md
```

## How to use

### Backend (local with Docker Compose)
1. Copy `.env.example` to `.env` and fill values.
2. From `backend/` run:
   ```
   docker-compose up --build
   ```
   This will start Postgres and the Django app (configured for development). The GraphQL endpoint is at `http://localhost:8000/graphql`.

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev` (Vite) — open at the URL printed by Vite (usually http://localhost:5173)

> The scaffold uses environment variables for the GraphQL endpoint URL.

## What is included
- Minimal Django project with models: Organization, Project, Task, TaskComment
- Graphene GraphQL schema with example queries & mutations
- Simple middleware for organization isolation (reads header `X-Org-Slug`)
- Vite + React + TypeScript frontend with Apollo client and minimal components
- Dockerfiles + docker-compose for local dev
- Docs and example configs

This is a scaffold: extend tests, styling, and CI as needed.

