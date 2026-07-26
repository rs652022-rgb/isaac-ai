# Project Audit: ISAAC.AI

This document outlines the current state of the application and lists all identified issues that prevent it from being a fully stabilized production application.

## 🔴 Critical Issues

### 1. Architectural Routing Conflict & Broken Authentication Flow
- **Root Cause**: The application relies on a single-page application (SPA) architecture driven by React state (`activeTab` in `src/app/page.tsx`). However, the authentication system (Auth.js) and Next.js middleware are configured to use physical App Router routes that do not exist or conflict with the SPA. 
  - `auth.config.ts` redirects unauthenticated users to `/login`, but this route does not exist (causing 404s).
  - The OAuth login buttons in `AuthModal.tsx` redirect users to `/dashboard` upon success.
  - The physical route `src/app/dashboard/page.tsx` exists, but it merely renders a JSON dump of the session instead of the actual `DashboardView` component. 
  - `middleware.ts` protects SPA paths like `/chat`, `/documents` as if they were physical routes.
- **Affected Files**:
  - `src/app/dashboard/page.tsx` (Conflicts with SPA)
  - `src/auth.config.ts` (Invalid `signIn` page)
  - `middleware.ts` (Invalid routing protection for SPA state)
  - `src/components/auth/AuthModal.tsx` (Invalid callback URLs)
- **Repair Plan**: 
  - Since the objective is "Do NOT redesign UI", we must fully embrace the SPA design. We will remove the conflicting `src/app/dashboard/page.tsx`.
  - Update Auth.js callbacks to redirect to `/` instead of `/dashboard`.
  - Update `middleware.ts` and `auth.config.ts` to protect `/` but conditionally allow access to the landing page and authentication modal, or remove Next.js middleware protection and rely entirely on the client-side SPA protection already present in `MainAppShell`.
- **Expected Outcome**: Users can seamlessly authenticate via Email, Google, or GitHub, and land in the SPA dashboard without encountering 404 errors or JSON dumps.

### 2. Prisma Database Initialization (Runtime Risk)
- **Root Cause**: In `src/lib/db.ts`, the Prisma adapter is initialized using `new PrismaBetterSqlite3({ url: ... })`. The `@prisma/adapter-better-sqlite3` package expects an instantiated `Database` object from the `better-sqlite3` driver, not a connection string object.
- **Affected Files**: `src/lib/db.ts`
- **Repair Plan**: Import `better-sqlite3` explicitly, instantiate the SQLite database with the file path from the environment variable, and pass that instance to the Prisma adapter.
- **Expected Outcome**: The application can reliably execute queries against the SQLite database without runtime adapter initialization failures.

## 🟠 High Issues

### 3. Server Actions & Form Submissions (General Stability)
- **Root Cause**: While we have NextAuth correctly configured in `auth.ts`, the credentials provider currently implements a signup/login hybrid without proper error handling or generic rate limiting.
- **Affected Files**: `src/auth.ts`, `src/components/auth/AuthModal.tsx`
- **Repair Plan**: Ensure the credentials authorize function gracefully returns errors to the client rather than throwing unhandled exceptions. Verify that `signIn("credentials", ...)` in `AuthModal.tsx` handles these rejections and displays them to the user.
- **Expected Outcome**: Reliable email/password authentication flow with visual feedback on failure.

## 🟡 Medium Issues

### 4. Client-Side Session Hydration
- **Root Cause**: The application wraps the root in `<SessionProvider>`, which is correct for App Router, but the `activeTab` protection logic in `MainAppShell` triggers redirects immediately if `status === "unauthenticated"`. During initial load, `status` is `"loading"`, which is handled correctly, but rapid state transitions might cause flickering.
- **Affected Files**: `src/app/page.tsx`
- **Repair Plan**: Implement a loading skeleton or null return while `status === "loading"` in `MainAppShell` to prevent UI flash or incorrect redirects before the session is hydrated.
- **Expected Outcome**: Smooth loading experience without flickering.

## 🟢 Low Issues

### 5. API Route Deep Linking
- **Root Cause**: Deep linking (e.g., sharing a URL like `localhost:3000/chat`) is impossible because the SPA does not sync `activeTab` with the URL query parameters or hash.
- **Affected Files**: `src/app/page.tsx`, `src/lib/store/app-context.tsx`
- **Repair Plan**: (Optional, if within stability scope) Sync `activeTab` state with a query parameter like `/?tab=chat` so users don't lose their place on refresh.
- **Expected Outcome**: The application supports hard refreshes without resetting the user to the landing page.
