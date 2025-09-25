# Technical Summary

Decisions & trade-offs:
- GraphQL (Graphene) chosen for flexible queries & mutations.
- Middleware reads X-Org-Slug to implement tenant isolation — simple and clear for an assessment.
- Docker compose provided for local dev; production deployment should use managed services (Render, Railway, Vercel for frontend).
- Subscriptions setup placeholder using Django Channels (redis) for bonus real-time features.
