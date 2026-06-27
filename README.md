# June & Rafael Wedding Website

A custom multi-page Vite + React wedding website for June & Rafael, June 16, 2027 at Xalet del Nin in Barcelona, Spain.

## Tech Stack

- Vite
- React
- Tailwind CSS
- React Router
- Google Forms for RSVP collection
- Google Sheets / Google Drive response storage through Google Forms
- GitHub Pages deployment with `gh-pages`

## Install

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Then open the local URL printed by Vite. The site password is configured in `src/data/weddingConfig.js`.

## Build

```bash
npm run build
```

The build also copies `dist/index.html` to `dist/404.html` so React Router routes work better on GitHub Pages refreshes.

## Deploy To GitHub Pages

1. Update `homepage` in `package.json` with your real GitHub Pages URL.
2. Update `base` in `vite.config.js` if your repository name is not `wedding`.
3. Install dependencies with `npm install`.
4. Run:

```bash
npm run deploy
```

This publishes the `dist` folder to the `gh-pages` branch.

## Editing Wedding Details

Core details live in:

```text
src/data/weddingConfig.js
```

Edit this file to update:

- Password
- Couple names
- Wedding date
- Venue and location
- Hero video and poster paths
- Google Form URLs
- RSVP deadline
- Schedule events
- Registry links
- Contact info
- Map embed URL
- Gallery images

## Updating Translations

All page text is stored in structured locale files:

```text
src/locales/en.js
src/locales/es-MX.js
src/locales/az.js
```

The default language is English. Guest language selection is saved in `localStorage`.

## Password Privacy

The password gate is simple frontend privacy only. The password is stored in the JavaScript bundle and can be discovered by someone technical. It is useful for casual guest privacy, but it is not server-side security.

To update the password, edit:

```js
password: 'dolmataco'
```

in `src/data/weddingConfig.js`.

## Replacing The Hero Video

The homepage uses:

```text
public/media/xalet-del-nin.mp4
public/images/venue-poster.jpg
```

Add your final compressed MP4 at `public/media/xalet-del-nin.mp4` and a poster image at `public/images/venue-poster.jpg`. A root-level `media/` folder can be used as a local drop folder, but Vite serves files from `public/`.

Recommended video export:

- MP4 / H.264
- Muted or no audio track
- 1080p or smaller
- 8-15 seconds if possible
- Aim for under 8 MB for fast mobile loading

Example compression command:

```bash
ffmpeg -i input.mov -vf "scale='min(1920,iw)':-2" -c:v libx264 -crf 24 -preset slow -an public/videos/venue.mp4
```

## Google Form RSVP

Create a Google Form with these fields:

- Full name
- Email address
- Phone number
- Will you attend?
- Meal preference
- Dietary restrictions
- Food allergies
- Will you attend the welcome event?
- Will you attend the wedding ceremony?
- Will you attend the reception?
- Will you attend brunch / afterparty if added?
- Message for June & Rafael

In Google Forms, click **Send**, choose the embed icon, and copy the iframe `src` URL. Paste it into:

```js
rsvp: {
  googleFormEmbedUrl: '...',
  googleFormUrl: '...',
}
```

## Connecting Google Form To Google Sheets

1. Open your Google Form.
2. Go to **Responses**.
3. Click **Link to Sheets**.
4. Create a new spreadsheet or select an existing one.
5. Google Forms will automatically store responses in Google Sheets and Google Drive.

## Adding A Google Map

Paste a Google Maps embed URL into:

```js
venue: {
  mapEmbedUrl: '...'
}
```

## Gallery Images

Gallery images go in:

```text
public/images/gallery/
```

Then update the matching arrays in `src/data/weddingConfig.js`.

## Custom Domain

1. In GitHub Pages settings, add your custom domain.
2. Configure your DNS provider with the records GitHub recommends.
3. Add a `public/CNAME` file containing only your domain, for example:

```text
www.juneandrafael.com
```

4. Redeploy with `npm run deploy`.
