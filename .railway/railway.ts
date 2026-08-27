import { defineRailway, postgres, preserve, project, service } from "railway/iac";

export default defineRailway(() => {
  const db = postgres("Postgres");

  const strapi = service("strapi", {
    build: "npm run build",
    start: "npm run start",
    healthcheck: "/_health",
    healthcheckTimeout: 300,
    env: {
      DATABASE_CLIENT: "postgres",
      DATABASE_URL: db.env.DATABASE_URL,
      URL: "https://${{RAILWAY_PUBLIC_DOMAIN}}",
      HOST: "::",
      STRAPI_TELEMETRY_DISABLED: "true",
      APP_KEYS: preserve(),
      API_TOKEN_SALT: preserve(),
      ADMIN_JWT_SECRET: preserve(),
      TRANSFER_TOKEN_SALT: preserve(),
      JWT_SECRET: preserve(),
      ENCRYPTION_KEY: preserve(),
    },
  });

  return project("strapi-5-template", {
    resources: [db, strapi],
  });
});
