# Dashboard Web App

A minimal, production-style dashboard for a technical assessment: mock auth, protected routes, user table with filter/sort/pagination, and add-user form.

## Stack

- **Next.js** (App Router, TypeScript)
- **Zustand** — auth state + localStorage
- **TailwindCSS** — styling
- **Axios** — API client
- **React Hook Form** — form validation
- **Jest + React Testing Library** — unit tests

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll be redirected to `/login`. Use any email and non-empty password to sign in (mock auth); then you’ll land on `/dashboard` with the users table and add-user form.

## Test Credentials

This app uses mock authentication — no real backend is required.

| Field    | Value                                                                 |
|----------|-----------------------------------------------------------------------|
| Email    | any valid format — e.g. `test@example.com`                            |
| Password | any non-empty string — e.g. `password123`                            |

> Authentication is simulated on the client. Any valid email + any password will log you in.

## Tests

```bash
npm test
```

Watch mode:

```bash
npm run test:watch
```

## Project structure

```
src/
├── app/
│   ├── login/page.tsx
│   ├── dashboard/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/           # Button, Input, Badge
│   ├── Table/        # DataTable, TableRow, ColumnHeader
│   ├── Pagination/
│   ├── LoginForm/
│   └── UserForm/
├── store/
│   └── authStore.ts
├── services/
│   └── api.ts
├── utils/
│   ├── validation.ts
│   └── cookie.ts
└── __tests__/
```

## Git commit sequence

Suggested history for a clean, incremental story:

1. `feat: scaffold Next.js project with folder structure`
2. `feat: implement mock auth with Zustand + localStorage`
3. `feat: add route protection via Next.js middleware`
4. `feat: build data table with API fetch and loading/error states`
5. `feat: add filtering, sorting, and pagination to table`
6. `feat: add user form with react-hook-form validation`
7. `feat: implement responsive layout with Tailwind`
8. `test: add unit tests for login form, table, and filter`
