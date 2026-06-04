# Lets Cook

A React + Vite recipe app with Supabase authentication, protected routes, and a shopping list experience.

## Features

- Feed screen with recipe browsing
- New recipe creation
- Shopping list management
- Email-based auth using Supabase OTP
- Protected routes for new recipe, shopping, and profile pages
- Bottom tab navigation UI

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file from the example:

```bash
cp .env.example .env
```

3. Set your Supabase credentials in `.env`:

```dotenv
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

4. Run the development server:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- The app is initialized with a default `main` branch.
- Protected routes redirect unauthenticated users to `/login`.
- `supabase.js` reads credentials from Vite environment variables.
