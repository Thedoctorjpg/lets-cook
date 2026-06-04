# Lets Cook

A React + Vite recipe app that includes:

- Recipe browsing and recipe feed
- Recipe creation flow
- Shopping list management
- Supabase-based email authentication
- Protected routes for authenticated pages
- Bottom tab navigation UI in the browser

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the env example:

```bash
cp .env.example .env
```

3. Add your Supabase keys to `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Start development:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- `supabase.js` reads credentials from Vite env variables.
- Unauthenticated users are redirected to `/login` for protected routes.
- The app uses `react-router-dom` for client-side routing.
