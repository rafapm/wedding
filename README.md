# June & Rafael Wedding Website

A custom multi-page Vite + React wedding website for June & Rafael, June 16, 2027 at Xalet del Nin in Barcelona, Spain.

## Tech Stack

- Vite
- React
- Tailwind CSS
- React Router
- Supabase for custom RSVP data
- GitHub Pages deployment with `gh-pages`

## Install

```bash
pnpm install
```

## Run Locally

```bash
pnpm dev
```

Then open the local URL printed by Vite. The site password is configured in `src/data/weddingConfig.js`.

## Build

```bash
pnpm build
```

The build also copies `dist/index.html` to `dist/404.html` so React Router routes work better on refresh.

## Deploy To GitHub Pages

The project is configured for the custom domain:

```text
https://juneandrafael.com/
```

Deploy with:

```bash
pnpm deploy
```

This publishes the `dist` folder to the `gh-pages` branch.

## Environment Variables

Copy `.env.example` to `.env.local` and add your Supabase project settings:

```bash
cp .env.example .env.local
```

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Only use the Supabase anon key in frontend code. Do not put a service-role key in this project.

## Custom RSVP Setup

The RSVP page uses `/rsvp` and looks up guests by the email address where they received their invitation. Email lookup is trimmed and compared case-insensitively. Guests can return later with the same email to update their RSVP.

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run:

```text
supabase/migrations/001_rsvp_schema.sql
```

4. Optionally run fake test data:

```text
supabase/seed.sql
```

5. Add your real households, guests, events, and event invites.
6. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to `.env.local` locally and to your deployment environment.

The main tables are:

- `households`
- `guests`
- `events`
- `guest_event_invites`
- `rsvps`
- `admin_users`
- `rsvp_lookup_attempts`

Each RSVP is unique by `guest_id` and `event_id`, so saves are idempotent and update existing responses instead of creating duplicates.

## Admin Setup

The admin page is available at:

```text
/admin
```

Admin access uses Supabase Auth email/password plus the `admin_users` allowlist table.

1. In Supabase, create an Auth user for June/Rafael.
2. Copy that Auth user's UUID.
3. Insert the admin user:

```sql
insert into admin_users (user_id, email)
values ('AUTH_USER_UUID_HERE', 'your-email@example.com');
```

The admin dashboard can:

- View all households and guests
- Search by name or email
- See who has RSVP'd and who is pending
- See invited and attending counts per event
- See meal counts
- See dietary restrictions and allergies
- See travel notes
- Manually update an RSVP
- Export RSVP data to CSV

## RSVP Data Model Notes

- One household can contain one guest, a couple, or a family.
- One email may represent a household.
- Guests can have individual event invitations.
- Plus-ones are supported per guest with `plus_one_allowed`.
- Event names, dates, descriptions, visibility, and order live in the `events` table.
- Guests only see events they are invited to.

## Security Notes

The public RSVP flow does not expose the full guest list. It only returns a household when the entered email or fallback code matches that household.

The SQL migration enables row-level security and uses RPC functions for public lookup and RSVP saving. A simple lookup-attempt log/rate limit is included in `lookup_invitation`.

The site-wide password gate is simple frontend privacy only. The password is stored in the JavaScript bundle and can be discovered by someone technical. It is useful for casual guest privacy, but it is not server-side security.

To update the site password, edit:

```js
password: 'your-private-password'
```

in `src/data/weddingConfig.js`.

## Editing Wedding Details

Core details live in:

```text
src/data/weddingConfig.js
```

Locale text lives in:

```text
src/locales/en.js
src/locales/es-MX.js
src/locales/az.js
```

## Replacing The Hero Video

The homepage uses:

```text
public/media/xalet-del-nin.mp4
public/images/xalet.jpg
```

Add your final compressed MP4 at `public/media/xalet-del-nin.mp4`. A root-level `media/` folder can be used as a local drop folder, but Vite serves files from `public/`.

Recommended video export:

- MP4 / H.264
- Muted or no audio track
- 1080p or smaller
- 8-15 seconds if possible
- Aim for under 8 MB for fast mobile loading

Example compression command:

```bash
ffmpeg -i input.mov -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 24 -preset slow -an public/media/xalet-del-nin.mp4
```

## Gallery Images

Gallery images go in:

```text
public/images/gallery/
```

Then update the matching arrays in `src/data/weddingConfig.js`.

## Custom Domain

The custom domain is stored in:

```text
public/CNAME
```

It should contain:

```text
juneandrafael.com
```
