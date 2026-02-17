# Bookmark App

A [Next.js](https://nextjs.org) app to save and manage links. Sign in with Google, add bookmarks (title + URL), and see them update in real time across tabs. Auth and data are powered by [Supabase](https://supabase.com).

## Flow & features

- **Home** — Login with Google (OAuth). Already logged-in users are redirected to the dashboard. If the user signs in in another tab, the login page detects it via the `storage` event and redirects.
- **Dashboard** — View bookmarks, add (title + URL), and delete. Realtime updates when data changes. Header shows user profile (avatar, name, email) and logout.
- **Auth** — Supabase Auth with Google. A global listener for `SIGNED_OUT` redirects all tabs to the home page on logout.

## Integration with Supabase

### 🔐 Security model

Database access is from the frontend but secured with Supabase’s built-in layers.

**Protections**

- Every request sends a signed JWT from Supabase Auth.
- Row Level Security (RLS) is enabled on the `bookmarks` table.
- Access is limited per user by RLS policies.

**Policies**

- **SELECT** — User can read only their own rows.
- **INSERT** — User can insert only rows with their own `user_id`.
- **DELETE** — User can delete only their own rows.

Even if the client is tampered with, the database rejects unauthorized access.

**Key safety**

- Only the **anon** (public) key is used in the frontend.
- No service role key or database credentials are exposed.

### ⚡ Realtime updates & subscriptions

Bookmarks stay in sync across tabs and after add/delete without a manual refresh.

**Supabase setup**

- In **Supabase Dashboard → Database → Replication**, add the `bookmarks` table to the realtime publication so Postgres broadcasts changes.

**Client subscription**

- **Channel** — One Realtime channel (e.g. `bookmarks-live`) is created when the dashboard mounts.
- **Listener** — `postgres_changes` on `schema: "public"`, `table: "bookmarks"`, `event: "*"` (INSERT, UPDATE, DELETE).
- **Handler** — On any change, the client calls `loadBookmarks(userId)` to refetch the list. RLS ensures only the current user’s rows are returned.
- **Cleanup** — In the `useEffect` cleanup, `supabase.removeChannel(channel)` runs when the user leaves the dashboard so subscriptions are removed.

**Behavior**

- An insert or delete in one tab (or from another device with the same user) triggers the subscription in all open dashboard tabs and the list reloads.
- Updates are push-based over Supabase Realtime (WebSocket); no polling.
- Tested with multiple tabs open.

### 🗄 Database schema

**Table: `bookmarks`**

| Column     | Type        | Notes |
|------------|-------------|--------|
| id         | uuid        | Primary key |
| user_id    | uuid        | References `auth.users.id` |
| title      | text        | Bookmark title |
| url        | text        | Bookmark URL |
| created_at | timestamptz | Default `now()` |

Ownership and access are enforced via RLS, not by client-side filtering.



## Challenges

### Syncing logout and login across tabs

With multiple tabs open, auth state had to stay in sync:

- **Logout in one tab** — The session lives in `localStorage`. Other tabs kept old in-memory state and didn’t redirect. **Fix:** Subscribe to `supabase.auth.onAuthStateChange()` and on `SIGNED_OUT` redirect with `window.location.href = "/"` so every tab does a full load and lands on the login screen.
- **Login in another tab** — If the user had the login page in tab A and completed Google sign-in in tab B, tab A didn’t see the new session. **Fix:** On the login page, listen for the `storage` event. When another tab writes the new session to `localStorage`, this tab calls `getUser()` and, if a session exists, redirects to the dashboard.


---


## Getting started

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app uses [Geist](https://vercel.com/font) via `next/font`.

## Learn more

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Deploy on Vercel](https://vercel.com/new) — connect the repo for one-click deploy.
# bookmark-app
