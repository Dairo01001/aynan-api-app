# aynan-api-app

API backend built with **NestJS**, **Prisma (PostgreSQL)** and **JWT auth**.

> ✅ This repo includes a working Postgres Docker compose setup, Prisma migrations + seed script, and a minimal auth/user/role module.

---

## 🧱 What’s inside

- NestJS (v11) REST API
- PostgreSQL database (via Docker or local PG)
- Prisma ORM with migrations + generated client
- Basic authentication (JWT + roles)
- Swagger UI (`/api`) for API exploration

---

## 🛠️ Prerequisites

- **Node.js** (v18+ recommended)
- **pnpm** (preferred package manager)
- **Docker** (optional, but recommended for local Postgres)

---

## 🚀 Quickstart (recommended)

### 1) Install dependencies

```bash
pnpm install
```

### 2) Start the database (Docker)

```bash
docker compose up -d
```

The compose setup exposes Postgres on **localhost:5432** with:
- user: `postgres`
- password: `0000`
- database: `test`

> If you prefer using a local Postgres instance, set `DATABASE_URL` accordingly in `.env`.

### 3) Configure environment variables

Copy the existing `.env` if you want to keep it as a template:

```bash
cp .env .env.local
```

Required env vars (with sensible defaults in the repo):

- `DATABASE_URL` (already set in `.env` for the docker-compose setup)
- `JWT_SECRET` (used by auth module)
- `PORT` (optional, defaults to `3000`)

Example (in `.env.local`):

```env
DATABASE_URL=postgresql://postgres:0000@localhost:5432/test
JWT_SECRET=super-secret-key
PORT=3000
```

### 4) Run Prisma migrations + seed data

```bash
pnpm prisma migrate dev
pnpm prisma db seed
```

> If you already have the database schema in sync but need to refresh the generated client (e.g., after changing `prisma/schema.prisma`), run:

```bash
pnpm prisma generate
```

This will create the required tables and insert an initial admin user.

📝 Default seeded admin credentials:
- **username:** `admin`
- **password:** `admin1234`

---

## ▶️ Run the server

```bash
pnpm run start:dev
```

The server will start on `http://localhost:3000` (or the port set in `PORT`).

✅ Swagger API docs available at: `http://localhost:3000/api`

---

## 🧪 Tests

```bash
pnpm run test
pnpm run test:e2e
pnpm run test:cov
```

---

## 🧭 Project structure (key folders)

- `src/` – main application code
  - `auth/` – authentication (JWT) + login endpoint
  - `users/` – user CRUD + password hashing
  - `roles/` – roles CRUD
  - `prisma/` – Prisma service + exception filter
- `prisma/` – schema, migrations, and seed script

---

## 🧩 Common development commands

- `pnpm run lint` – run ESLint + auto-fix
- `pnpm run format` – run Prettier on `.ts` files
- `pnpm run build` – build for production (outputs to `dist/`)
- `pnpm run start:prod` – run the built app

---

## 🔒 Auth (JWT)

The authentication system uses a JWT issued by `/auth/login`.

### Login

- `POST /auth/login`

Payload example:

```json
{
  "username": "admin",
  "password": "admin1234"
}
```

It returns a JWT you can use in the `Authorization: Bearer <token>` header.

---

## 📌 Notes

- The project uses Prisma’s **PostgreSQL adapter** (`@prisma/adapter-pg`), which requires `DATABASE_URL` to be a `postgresql://` URI.
- If you update `prisma/schema.prisma`, run `pnpm prisma migrate dev` to generate a new migration and update the client.

---

## ✅ Next steps for a new developer

1. Start the dev server: `pnpm run start:dev`
2. Open Swagger docs: `http://localhost:3000/api`
3. Explore existing controllers: `src/users`, `src/roles`, `src/auth`
4. Add new endpoints and update Prisma schema as needed

---

## 🧠 Helpful links

- NestJS docs: https://docs.nestjs.com
- Prisma docs: https://www.prisma.io/docs
- Swagger UI: https://swagger.io/docs/
