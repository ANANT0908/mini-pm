# Setup Instructions (detailed)

See README.md for quick start. Key points:
- Backend: docker-compose in backend/ contains Postgres + Django dev server.
- Frontend: Vite; configure `VITE_GRAPHQL_HTTP` in environment or `.env`.

Examples:
- Start backend: (from backend) `docker-compose up --build`
- Start frontend: (from frontend) `npm install && npm run dev`
