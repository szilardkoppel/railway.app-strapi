# Strapi 5 on Railway

A production-ready [Strapi 5](https://strapi.io) template for [Railway](https://railway.com), running on the latest Strapi with PostgreSQL.

## What's included

- **Strapi 5** (TypeScript) with the users-permissions plugin
- **PostgreSQL** via Railway's `postgres-ssl` service, connected over the private network with `DATABASE_URL`
- **Health check** at `/_health` (Strapi built-in) wired into Railway's deploy health check
- **Optional Cloudinary uploads** — set `CLOUDINARY_NAME`, `CLOUDINARY_KEY`, and `CLOUDINARY_SECRET` to switch the upload provider from the local filesystem to Cloudinary
- **Infrastructure as Code** — the Railway project (services, variables, health check) is described in [`.railway/railway.ts`](.railway/railway.ts)

## Deploy on Railway

Deploy from the template, or manually:

1. Create a project with a PostgreSQL database.
2. Add a service from this repo and set the variables below.
3. Generate a public domain for the service.

### Required variables

| Variable | Value |
|---|---|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` |
| `URL` | `https://${{RAILWAY_PUBLIC_DOMAIN}}` |
| `HOST` | `::` |
| `APP_KEYS` | four comma-separated random secrets |
| `API_TOKEN_SALT` | random secret |
| `ADMIN_JWT_SECRET` | random secret |
| `TRANSFER_TOKEN_SALT` | random secret |
| `JWT_SECRET` | random secret |
| `ENCRYPTION_KEY` | random secret |

Generate secrets with `openssl rand -base64 32`.

> **Note:** uploaded media is stored on the container filesystem by default and does not survive redeploys. Either configure Cloudinary (variables above) or mount a Railway volume at `/app/public/uploads`.

## Local development

```bash
cp .env.example .env   # fill in the secrets
npm install
npm run develop
```

Uses SQLite locally by default; set `DATABASE_CLIENT=postgres` and `DATABASE_URL` to develop against Postgres.

## Scripts

- `npm run develop` — dev server with admin hot reload
- `npm run build` — build the admin panel
- `npm run start` — production server
- `npm run upgrade` — upgrade Strapi to the latest version
