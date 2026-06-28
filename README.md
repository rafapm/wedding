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

### 1. Create the database tables

In Supabase, go to **SQL Editor** and create a new query.

Do **not** type the file path into the SQL editor. You need to paste the actual SQL inside the file.

From Terminal, copy the migration SQL to your clipboard:

```bash
cd /Users/rafapm/Documents/GitHub/wedding
pbcopy < supabase/migrations/001_rsvp_schema.sql
```

Then:

1. Go back to Supabase SQL Editor.
2. Paste into the editor.
3. Click **Run**.

This creates:

- `households`
- `guests`
- `events`
- `guest_event_invites`
- `rsvps`
- `admin_users`
- `rsvp_lookup_attempts`

It also creates the lookup/save/admin functions used by the website.

### 2. Add test data

Optional, but helpful while testing. Copy the seed SQL:

```bash
cd /Users/rafapm/Documents/GitHub/wedding
pbcopy < supabase/seed.sql
```

Paste it into a new Supabase SQL Editor query and click **Run**.

The seed creates fake guests you can test with:

```text
alex.rivera@example.com
sam.rivera@example.com
maya.chen@example.com
```

### 3. Add real guests later

After testing, add your real households, guests, events, and event invitations in Supabase. The most important relationship is:

- `households` stores the invitation/household.
- `guests` stores each individual guest.
- `events` stores RSVP-able events.
- `guest_event_invites` controls which guest sees which events.
- `rsvps` stores one response per guest per event.

### 4. Connect the website to Supabase

In Supabase, go to **Project Settings → API**.

Copy:

- Project URL
- `anon public` key

Create `.env.local`:

```bash
cd /Users/rafapm/Documents/GitHub/wedding
cp .env.example .env.local
```

Edit `.env.local`:

```text
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Restart the local dev server after changing `.env.local`.

For deployment, these `VITE_` values must exist when you run `pnpm build` or `pnpm deploy`, because Vite bakes them into the static site.

One simple local deploy option is:

```bash
cd /Users/rafapm/Documents/GitHub/wedding
set -a
source .env.local
set +a
pnpm deploy
```

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
